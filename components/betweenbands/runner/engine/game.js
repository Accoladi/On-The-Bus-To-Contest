// ============================================================================
// engine/game.js — Halftime Hustle 3D engine (Phase 1)
// ============================================================================
//
// A self-contained Three.js endless-runner core. Framework-agnostic: it owns a
// canvas inside a host element, runs its own rAF loop, and reports state out via
// callbacks. React just mounts/unmounts it.
//
// Phase 1 scope: lit band field with scrolling yard lines, a chase camera, a
// 3-lane player with smooth lane changes + jump, rising speed, distance score.
// Obstacles, collisions, notes & the Song Meter arrive in later phases.
//
// Treadmill model: the player holds z≈0; scenery spawns far down-field (−z) and
// scrolls toward the camera (+z), recycling when it passes behind.
// ============================================================================

import * as THREE from 'three';
import {
    LANE_X, START_SPEED, MAX_SPEED, SPEED_RAMP, LANE_CHANGE_SPEED,
    GRAVITY, JUMP_VELOCITY, PLAYER_GROUND_Y,
    YARD_LINE_SPACING, TRACK_LENGTH, DESPAWN_Z, COLORS,
    OBSTACLE_SPAWN_Z, SPAWN_GAP_MIN, SPAWN_GAP_MAX, SPAWN_GAP_RAMP,
    COLLISION_Z, COLLISION_X, OBSTACLE_TYPES,
    NOTE_SPAWN_GAP_MIN, NOTE_SPAWN_GAP_MAX, NOTES_PER_TRAIL, NOTE_TRAIL_SPACING,
    NOTES_PER_SONG, NOTE_COLLECT_Z, NOTE_COLLECT_X, NOTE_COLLECT_Y,
    NOTE_GROUND_Y, NOTE_HIGH_Y, NOTE_ELEVATED_CHANCE, NOTE_POINTS,
    MARCHING_SPEED_MULT, MARCHING_MAX_MS, NOTE_MULT_MARCHING, SONGS,
} from '../runnerData';
import { loadModelAsset, MODEL_ASSETS } from './assets';

// Weighted random pick of an obstacle archetype.
const _totalWeight = OBSTACLE_TYPES.reduce((s, t) => s + t.weight, 0);
function pickObstacleType() {
    let r = Math.random() * _totalWeight;
    for (const t of OBSTACLE_TYPES) {
        if ((r -= t.weight) <= 0) return t;
    }
    return OBSTACLE_TYPES[0];
}

export default class HalftimeHustleGame {
    /**
     * @param {HTMLElement} host  container element to mount the canvas into
     * @param {object} opts
     * @param {(score:number)=>void}  opts.onScore   distance score (rounded) changed
     * @param {(state:string)=>void}  opts.onState   'ready' | 'playing' | 'over'
     */
    constructor(host, {
        onScore = () => {}, onState = () => {},
        onMeter = () => {}, onNotes = () => {}, onSong = () => {},
    } = {}) {
        this.host = host;
        this.onScore = onScore;
        this.onState = onState;
        this.onMeter = onMeter;   // (ratio 0..1)
        this.onNotes = onNotes;   // (totalNotesCollected)
        this.onSong = onSong;     // (title|null) — null when Marching Mode ends

        this.state = 'ready';
        this.speed = START_SPEED;
        this.distance = 0;
        this._lastScore = -1;

        // Notes & Song Meter
        this.notes = [];
        this._distSinceNote = 0;
        this._nextNoteGap = NOTE_SPAWN_GAP_MIN;
        this.songMeter = 0;         // 0..NOTES_PER_SONG
        this.notesCollected = 0;

        // Marching Mode
        this.marching = false;
        this._marchTimer = null;
        this._songAudio = null;

        // GLTF models (loaded async; null until/unless a .glb is present)
        this._models = {};      // key → { scene, animations }
        this._mixer = null;     // player animation mixer (when model loaded)

        // Player lane state
        this.laneIndex = 1;                       // start in the middle lane
        this.playerX = LANE_X[this.laneIndex];
        this.playerY = PLAYER_GROUND_Y;
        this.velY = 0;
        this.isJumping = false;

        this._runTime = 0;                        // seconds since start (for leg swing)
        this._lastT = 0;                          // timestamp of previous frame (ms)
        this._raf = null;

        // Obstacles
        this.obstacles = [];
        this._distSinceSpawn = 0;
        this._nextGap = SPAWN_GAP_MIN;

        this._initRenderer();
        this._initScene();
        this._initField();
        this._initPlayer();
        this._loadModels();

        this._initSfx();

        this._onResize = this._onResize.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._loop = this._loop.bind(this);
        this._touch = null;

        window.addEventListener('resize', this._onResize);
        window.addEventListener('keydown', this._onKeyDown);
        const dom = this.renderer.domElement;
        dom.addEventListener('touchstart', this._onTouchStart, { passive: false });
        dom.addEventListener('touchend', this._onTouchEnd, { passive: false });

        // Render one idle frame so the field is visible behind the start overlay.
        this.renderer.render(this.scene, this.camera);
    }

    // ─── Setup ──────────────────────────────────────────────────────────────
    _initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.host.clientWidth, this.host.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.host.appendChild(this.renderer.domElement);
    }

    _initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(COLORS.sky);
        this.scene.fog = new THREE.Fog(COLORS.fog, 55, 175);

        const aspect = this.host.clientWidth / this.host.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 400);
        this.camera.position.set(0, 5.2, 9);
        this.camera.lookAt(0, 1.4, -12);

        const ambient = new THREE.HemisphereLight(0xfff1d8, 0x322412, 1.15);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xfff3e0, 1.5);
        sun.position.set(-8, 18, 6);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 60;
        sun.shadow.camera.left = -12;
        sun.shadow.camera.right = 12;
        sun.shadow.camera.top = 12;
        sun.shadow.camera.bottom = -12;
        this.scene.add(sun);
    }

    _initField() {
        const fieldWidth = 14;

        // Base turf
        const turf = new THREE.Mesh(
            new THREE.PlaneGeometry(fieldWidth, TRACK_LENGTH + 80),
            new THREE.MeshStandardMaterial({ color: COLORS.field, roughness: 1 })
        );
        turf.rotation.x = -Math.PI / 2;
        turf.position.z = -TRACK_LENGTH / 2 + DESPAWN_Z;
        turf.receiveShadow = true;
        this.scene.add(turf);

        // Sidelines (visual track boundaries)
        const sideMat = new THREE.MeshStandardMaterial({ color: COLORS.sideline, roughness: 0.9 });
        for (const sx of [-fieldWidth / 2 - 0.6, fieldWidth / 2 + 0.6]) {
            const rail = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, TRACK_LENGTH + 80), sideMat);
            rail.position.set(sx, 0.5, turf.position.z);
            rail.castShadow = true;
            rail.receiveShadow = true;
            this.scene.add(rail);
        }

        // Scrolling yard lines — recycled to fake forward motion.
        this.yardLines = [];
        const lineGeo = new THREE.PlaneGeometry(fieldWidth, 0.25);
        const lineMat = new THREE.MeshStandardMaterial({
            color: COLORS.yardLine, roughness: 1,
            transparent: true, opacity: 0.8,
        });
        const count = Math.ceil(TRACK_LENGTH / YARD_LINE_SPACING) + 2;
        for (let i = 0; i < count; i++) {
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.rotation.x = -Math.PI / 2;
            line.position.set(0, 0.02, DESPAWN_Z - i * YARD_LINE_SPACING);
            this.scene.add(line);
            this.yardLines.push(line);
        }
    }

    _initPlayer() {
        // `player` is the container we move; `_playerVisual` holds whatever art is
        // shown (primitive now, GLB once it loads). Swapping art = swapping the child.
        this.player = new THREE.Group();
        this._playerVisual = this._buildPrimitivePlayer();
        this.player.add(this._playerVisual);

        this.player.position.set(this.playerX, this.playerY, 0);
        this.scene.add(this.player);
    }

    _buildPrimitivePlayer() {
        const visual = new THREE.Group();

        const bodyMat = new THREE.MeshStandardMaterial({ color: COLORS.player, roughness: 0.6, metalness: 0.1 });
        const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.8, 6, 12), bodyMat);
        body.castShadow = true;
        visual.add(body);

        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.32, 16, 16),
            new THREE.MeshStandardMaterial({ color: COLORS.playerAccent, roughness: 0.5 })
        );
        head.position.y = 1.05;
        head.castShadow = true;
        visual.add(head);

        // Simple legs so motion reads as "running" until we have a real model.
        const legMat = new THREE.MeshStandardMaterial({ color: COLORS.sideline, roughness: 0.8 });
        this.legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.5, 4, 8), legMat);
        this.legR = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.5, 4, 8), legMat);
        this.legL.position.set(-0.2, -0.85, 0);
        this.legR.position.set(0.2, -0.85, 0);
        this.legL.castShadow = this.legR.castShadow = true;
        visual.add(this.legL, this.legR);

        return visual;
    }

    // ─── Model loading (graceful: primitives stay if a .glb is absent) ────────
    _loadModels() {
        for (const key of Object.keys(MODEL_ASSETS)) {
            loadModelAsset(key).then(res => {
                if (!res) return;                 // missing/broken → keep primitive
                this._models[key] = res;
                if (key === 'player') this._applyPlayerModel(res);
            });
        }
    }

    _applyPlayerModel({ scene, animations }) {
        // Swap the primitive visual for the loaded student model.
        this.player.remove(this._playerVisual);
        this._disposeObject(this._playerVisual);
        this.legL = this.legR = null;

        this._playerVisual = scene;
        this.player.add(scene);

        // Drive a run animation if the model ships one.
        if (animations && animations.length) {
            this._mixer = new THREE.AnimationMixer(scene);
            const run = animations.find(c => /run|jog|sprint/i.test(c.name)) || animations[0];
            this._mixer.clipAction(run).play();
        }
        if (this.marching) this._setMarchingVisual(true); // preserve glow if mid-song
    }

    // ─── Obstacles (instruments) ──────────────────────────────────────────────
    /**
     * Build an instrument for a given archetype. Uses the loaded GLB model when
     * available, otherwise the primitive placeholder. Returns a Group with
     * userData { jumpable, clearH, shared } — `shared` flags model clones so we
     * don't dispose geometry/materials owned by the cached template.
     */
    _buildObstacle(type) {
        const model = this._models[type.id];
        if (model) {
            const group = model.scene.clone(true);
            group.userData = { jumpable: !!type.jumpable, clearH: type.clearH || 0, shared: true };
            return group;
        }

        const group = new THREE.Group();

        if (type.id === 'bassDrum') {
            // Bass drum lying on its side — a low prop you can jump over.
            const shell = new THREE.Mesh(
                new THREE.CylinderGeometry(0.7, 0.7, 1.0, 20),
                new THREE.MeshStandardMaterial({ color: COLORS.playerAccent, roughness: 0.6 })
            );
            shell.rotation.z = Math.PI / 2;
            shell.position.y = 0.7;
            group.add(shell);
            const rim = new THREE.Mesh(
                new THREE.TorusGeometry(0.7, 0.08, 8, 20),
                new THREE.MeshStandardMaterial({ color: COLORS.player, roughness: 0.4, metalness: 0.3 })
            );
            rim.position.set(0.5, 0.7, 0);
            rim.rotation.y = Math.PI / 2;
            group.add(rim);
        } else if (type.id === 'sousaphone') {
            // Tall brassy coil with a big bell — must dodge by lane.
            const body = new THREE.Mesh(
                new THREE.TorusGeometry(0.6, 0.18, 10, 24),
                new THREE.MeshStandardMaterial({ color: 0xc8902f, roughness: 0.35, metalness: 0.55 })
            );
            body.position.y = 1.2;
            group.add(body);
            const bell = new THREE.Mesh(
                new THREE.CylinderGeometry(0.7, 0.28, 0.7, 20, 1, true),
                new THREE.MeshStandardMaterial({ color: 0xe0a93f, roughness: 0.3, metalness: 0.6, side: THREE.DoubleSide })
            );
            bell.position.set(0, 2.05, 0);
            group.add(bell);
        } else {
            // Music stand — a thin tall prop, dodge by lane.
            const pole = new THREE.Mesh(
                new THREE.CylinderGeometry(0.06, 0.06, 1.7, 8),
                new THREE.MeshStandardMaterial({ color: COLORS.sideline, roughness: 0.8 })
            );
            pole.position.y = 0.85;
            group.add(pole);
            const tray = new THREE.Mesh(
                new THREE.BoxGeometry(0.9, 0.6, 0.08),
                new THREE.MeshStandardMaterial({ color: COLORS.sideline, roughness: 0.8 })
            );
            tray.position.set(0, 1.6, 0);
            tray.rotation.x = -0.5;
            group.add(tray);
        }

        group.traverse(o => { if (o.isMesh) o.castShadow = true; });
        group.userData = { jumpable: !!type.jumpable, clearH: type.clearH || 0 };
        return group;
    }

    _spawnObstacleRow() {
        // Block 1–2 lanes, never all three (always leave an escape lane).
        const laneIdxs = [0, 1, 2];
        const blockCount = Math.random() < 0.35 ? 2 : 1;
        // Shuffle, take the first N
        for (let i = laneIdxs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [laneIdxs[i], laneIdxs[j]] = [laneIdxs[j], laneIdxs[i]];
        }
        const blocked = laneIdxs.slice(0, blockCount);

        for (const lane of blocked) {
            const type = pickObstacleType();
            const ob = this._buildObstacle(type);
            ob.position.set(LANE_X[lane], 0, OBSTACLE_SPAWN_Z);
            this.scene.add(ob);
            this.obstacles.push(ob);
        }
    }

    // Dispose an object's geometry/materials. Skipped for `shared` model clones,
    // whose resources belong to the cached template (disposing would break others).
    _disposeObject(obj) {
        obj.traverse(o => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
                const mats = Array.isArray(o.material) ? o.material : [o.material];
                mats.forEach(m => m.dispose());
            }
        });
    }

    _disposeObstacle(ob) {
        this.scene.remove(ob);
        if (!ob.userData.shared) this._disposeObject(ob);
    }

    _clearObstacles() {
        for (const ob of this.obstacles) this._disposeObstacle(ob);
        this.obstacles.length = 0;
    }

    _checkCollision() {
        if (this.marching) return false; // invincible while the band plays
        for (const ob of this.obstacles) {
            if (Math.abs(ob.position.z) > COLLISION_Z) continue;
            if (Math.abs(ob.position.x - this.playerX) > COLLISION_X) continue;
            const clearedByJump =
                ob.userData.jumpable &&
                (this.playerY - PLAYER_GROUND_Y) >= ob.userData.clearH;
            if (!clearedByJump) return true;
        }
        return false;
    }

    // ─── Notes & Song Meter ───────────────────────────────────────────────────
    /**
     * Build a glowing music note (note head + stem). Swapped for GLB in Phase 5.
     */
    _buildNote() {
        const model = this._models.note;
        if (model) {
            const note = model.scene.clone(true);
            note.userData = { shared: true };
            return note;
        }

        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({
            color: COLORS.note, emissive: COLORS.note,
            emissiveIntensity: 0.55, roughness: 0.4, metalness: 0.2,
        });
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 14), mat);
        head.scale.set(1, 0.8, 1);
        group.add(head);
        const stem = new THREE.Mesh(
            new THREE.BoxGeometry(0.07, 0.85, 0.07),
            new THREE.MeshStandardMaterial({ color: COLORS.noteStem, roughness: 0.6 })
        );
        stem.position.set(0.27, 0.5, 0);
        group.add(stem);
        return group;
    }

    _spawnNoteTrail() {
        const lane = Math.floor(Math.random() * LANE_X.length);
        const elevated = Math.random() < NOTE_ELEVATED_CHANCE;
        const n = NOTES_PER_TRAIL;
        for (let i = 0; i < n; i++) {
            const note = this._buildNote();
            // Elevated trails arc up into a jump-shaped curve.
            const arc = elevated ? Math.sin((i / (n - 1)) * Math.PI) : 0;
            const y = NOTE_GROUND_Y + arc * (NOTE_HIGH_Y - NOTE_GROUND_Y);
            note.position.set(LANE_X[lane], y, OBSTACLE_SPAWN_Z - i * NOTE_TRAIL_SPACING);
            this.scene.add(note);
            this.notes.push(note);
        }
    }

    _disposeNote(note) {
        this.scene.remove(note);
        if (!note.userData.shared) this._disposeObject(note);
    }

    _clearNotes() {
        for (const note of this.notes) this._disposeNote(note);
        this.notes.length = 0;
    }

    _collectNote(note, idx) {
        this._disposeNote(note);
        this.notes.splice(idx, 1);

        this._playSfx('pickup');
        this.notesCollected += 1;
        this.onNotes(this.notesCollected);

        // Note bonus (doubled during Marching Mode)
        const pts = NOTE_POINTS * (this.marching ? NOTE_MULT_MARCHING : 1);
        this.distance += pts;

        // Notes only fill the meter when NOT already marching.
        if (!this.marching) {
            this.songMeter += 1;
            this.onMeter(this.songMeter / NOTES_PER_SONG);
            if (this.songMeter >= NOTES_PER_SONG) this._startMarching();
        }
    }

    // ─── Marching Mode ────────────────────────────────────────────────────────
    _startMarching() {
        this.songMeter = 0;
        this.onMeter(0);
        this.marching = true;
        this._setMarchingVisual(true);

        const song = SONGS[Math.floor(Math.random() * SONGS.length)];
        this.onSong(song.title);

        // Play the marching tune; end the mode when it finishes (or after a cap).
        try {
            this._songAudio = new Audio(song.src);
            this._songAudio.volume = 0.85;
            this._songAudio.addEventListener('ended', () => this._endMarching(), { once: true });
            this._songAudio.play().catch(() => {});
        } catch (e) { /* audio optional */ }

        if (this._marchTimer) clearTimeout(this._marchTimer);
        this._marchTimer = setTimeout(() => this._endMarching(), MARCHING_MAX_MS);
    }

    _endMarching() {
        if (!this.marching) return;
        this.marching = false;
        this._setMarchingVisual(false);
        this.onSong(null);
        if (this._marchTimer) { clearTimeout(this._marchTimer); this._marchTimer = null; }
        if (this._songAudio) {
            this._songAudio.pause();
            this._songAudio.currentTime = 0;
            this._songAudio = null;
        }
    }

    _setMarchingVisual(on) {
        // Glow every material on whatever the current player visual is
        // (primitive capsule or loaded GLB), so the effect survives a model swap.
        this._playerVisual.traverse(o => {
            if (!o.isMesh) return;
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach(m => {
                if (!m.emissive) return;
                m.emissive.setHex(on ? COLORS.note : 0x000000);
                m.emissiveIntensity = on ? 0.6 : 0;
            });
        });
    }

    // ─── Public controls ─────────────────────────────────────────────────────
    start() {
        if (this.state === 'playing') return;
        this._resetRun();
        this.state = 'playing';
        this.onState('playing');
        this._lastT = performance.now();
        this._raf = requestAnimationFrame(this._loop);
    }

    _resetRun() {
        this.speed = START_SPEED;
        this.distance = 0;
        this._lastScore = -1;
        this._runTime = 0;
        this.laneIndex = 1;
        this.playerX = LANE_X[this.laneIndex];
        this.playerY = PLAYER_GROUND_Y;
        this.velY = 0;
        this.isJumping = false;
        this.player.position.set(this.playerX, this.playerY, 0);
        this._distSinceSpawn = 0;
        this._nextGap = SPAWN_GAP_MIN;
        this._clearObstacles();

        // Notes & Song Meter
        this._endMarching();
        this._clearNotes();
        this._distSinceNote = 0;
        this._nextNoteGap = NOTE_SPAWN_GAP_MIN;
        this.songMeter = 0;
        this.notesCollected = 0;
        this.onMeter(0);
        this.onNotes(0);

        this.onScore(0);
    }

    _gameOver() {
        this.state = 'over';
        this._playSfx('crash');
        this._endMarching();
        if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
        this.onState('over');
        // Render one final frozen frame on the crash.
        this.renderer.render(this.scene, this.camera);
    }

    moveLane(dir) {
        if (this.state !== 'playing') return;
        this.laneIndex = THREE.MathUtils.clamp(this.laneIndex + dir, 0, LANE_X.length - 1);
    }

    jump() {
        if (this.state !== 'playing' || this.isJumping) return;
        this.isJumping = true;
        this.velY = JUMP_VELOCITY;
        this._playSfx('jump');
    }

    // ─── Sound effects ────────────────────────────────────────────────────────
    _initSfx() {
        // Reuse the site's existing sound assets. Cloned per play so rapid
        // pickups can overlap without cutting each other off.
        const make = (src, volume) => { const a = new Audio(src); a.volume = volume; return a; };
        this._sfx = {
            jump: make('/sounds/player-move.mp3', 0.4),
            pickup: make('/sounds/trivia-select.mp3', 0.35),
            crash: make('/sounds/button-sound.mp3', 0.6),
        };
    }

    _playSfx(name) {
        const base = this._sfx && this._sfx[name];
        if (!base) return;
        const a = base.cloneNode();
        a.volume = base.volume;
        a.play().catch(() => {});
    }

    // ─── Input ────────────────────────────────────────────────────────────────
    _onKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft': case 'a': case 'A': this.moveLane(-1); break;
            case 'ArrowRight': case 'd': case 'D': this.moveLane(1); break;
            case 'ArrowUp': case 'w': case 'W': case ' ':
                e.preventDefault(); this.jump(); break;
            default: break;
        }
    }

    _onTouchStart(e) {
        const t = e.changedTouches[0];
        this._touch = { x: t.clientX, y: t.clientY };
    }

    _onTouchEnd(e) {
        if (!this._touch) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - this._touch.x;
        const dy = t.clientY - this._touch.y;
        this._touch = null;

        const THRESH = 28; // px before a drag counts as a swipe
        if (Math.abs(dx) < THRESH && Math.abs(dy) < THRESH) return;
        e.preventDefault();

        if (Math.abs(dx) > Math.abs(dy)) {
            this.moveLane(dx > 0 ? 1 : -1);      // horizontal swipe → change lane
        } else if (dy < 0) {
            this.jump();                          // upward swipe → jump
        }
    }

    // ─── Loop ─────────────────────────────────────────────────────────────────
    _loop() {
        this._raf = requestAnimationFrame(this._loop);
        const now = performance.now();
        const dt = Math.min((now - this._lastT) / 1000, 0.05); // clamp huge jumps
        this._lastT = now;
        this._update(dt);
        this.renderer.render(this.scene, this.camera);
    }

    _update(dt) {
        this._runTime += dt;

        // Difficulty ramp
        this.speed = Math.min(MAX_SPEED, this.speed + SPEED_RAMP * dt);

        // Effective speed includes the Marching Mode boost.
        const effSpeed = this.speed * (this.marching ? MARCHING_SPEED_MULT : 1);

        // Distance score
        this.distance += effSpeed * dt;
        const rounded = Math.floor(this.distance);
        if (rounded !== this._lastScore) {
            this._lastScore = rounded;
            this.onScore(rounded);
        }

        // Scroll scenery toward the camera, recycle past the despawn edge.
        const move = effSpeed * dt;
        for (const line of this.yardLines) {
            line.position.z += move;
            if (line.position.z > DESPAWN_Z) line.position.z -= TRACK_LENGTH;
        }

        // Spawn obstacle rows on a distance cadence that tightens with speed.
        this._distSinceSpawn += move;
        if (this._distSinceSpawn >= this._nextGap) {
            this._distSinceSpawn = 0;
            this._spawnObstacleRow();
            const gapRange = SPAWN_GAP_MAX - SPAWN_GAP_MIN;
            const tighten = Math.min(gapRange, (this.speed - START_SPEED) * SPAWN_GAP_RAMP);
            this._nextGap = SPAWN_GAP_MIN + Math.random() * (gapRange - tighten);
        }

        // Move obstacles toward the camera; despawn behind.
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const ob = this.obstacles[i];
            ob.position.z += move;
            if (ob.position.z > DESPAWN_Z) {
                this._disposeObstacle(ob);
                this.obstacles.splice(i, 1);
            }
        }

        // Spawn note trails on their own (more frequent) cadence.
        this._distSinceNote += move;
        if (this._distSinceNote >= this._nextNoteGap) {
            this._distSinceNote = 0;
            this._spawnNoteTrail();
            this._nextNoteGap = NOTE_SPAWN_GAP_MIN +
                Math.random() * (NOTE_SPAWN_GAP_MAX - NOTE_SPAWN_GAP_MIN);
        }

        // Move notes, spin for shimmer, collect on overlap, despawn behind.
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.position.z += move;
            note.rotation.y += dt * 3;
            if (
                Math.abs(note.position.z) < NOTE_COLLECT_Z &&
                Math.abs(note.position.x - this.playerX) < NOTE_COLLECT_X &&
                Math.abs(note.position.y - this.playerY) < NOTE_COLLECT_Y
            ) {
                this._collectNote(note, i);
                continue;
            }
            if (note.position.z > DESPAWN_Z) {
                this._disposeNote(note);
                this.notes.splice(i, 1);
            }
        }

        // Smooth lane change (lerp toward target x)
        const targetX = LANE_X[this.laneIndex];
        this.playerX += (targetX - this.playerX) * Math.min(1, LANE_CHANGE_SPEED * dt);

        // Jump physics
        if (this.isJumping) {
            this.velY -= GRAVITY * dt;
            this.playerY += this.velY * dt;
            if (this.playerY <= PLAYER_GROUND_Y) {
                this.playerY = PLAYER_GROUND_Y;
                this.velY = 0;
                this.isJumping = false;
            }
        }

        this.player.position.set(this.playerX, this.playerY, 0);
        // Lean into turns for a little life
        this.player.rotation.z = (this.playerX - targetX) * 0.12;

        // Player animation: GLB mixer if loaded, else swing the primitive legs.
        if (this._mixer) {
            this._mixer.update(dt);
        } else if (this.legL) {
            const swing = this.isJumping ? 0.5 : Math.sin(this._runTime * 18) * 0.6;
            this.legL.rotation.x = swing;
            this.legR.rotation.x = -swing;
        }

        // Collision → game over
        if (this._checkCollision()) this._gameOver();
    }

    // ─── Teardown ──────────────────────────────────────────────────────────────
    _onResize() {
        const w = this.host.clientWidth, h = this.host.clientHeight;
        if (!w || !h) return;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    dispose() {
        if (this._raf) cancelAnimationFrame(this._raf);
        this._endMarching();
        window.removeEventListener('resize', this._onResize);
        window.removeEventListener('keydown', this._onKeyDown);
        const dom = this.renderer.domElement;
        dom.removeEventListener('touchstart', this._onTouchStart);
        dom.removeEventListener('touchend', this._onTouchEnd);
        if (this._mixer) { this._mixer.stopAllAction(); this._mixer = null; }
        this.scene.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                mats.forEach(m => m.dispose());
            }
        });
        // Cached model templates live outside the scene graph — free them too.
        for (const key of Object.keys(this._models)) {
            this._disposeObject(this._models[key].scene);
        }
        this._models = {};
        this.renderer.dispose();
        if (this.renderer.domElement.parentNode === this.host) {
            this.host.removeChild(this.renderer.domElement);
        }
    }
}
