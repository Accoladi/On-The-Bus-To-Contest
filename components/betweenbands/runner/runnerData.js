// ============================================================================
// runnerData.js — Halftime Hustle tuning constants & content
// ============================================================================
//
// Central place for gameplay tuning so the engine stays declarative.
// Phase 1 only uses the layout/motion constants; songs & obstacles are
// referenced here now so later phases have a single source of truth.
//
// ============================================================================

// ─── Lane layout ────────────────────────────────────────────────────────────
export const LANE_COUNT = 3;
export const LANE_WIDTH = 2.4;            // world units between lane centers
// Lane center x-positions: [-LANE_WIDTH, 0, +LANE_WIDTH]
export const LANE_X = Array.from(
    { length: LANE_COUNT },
    (_, i) => (i - (LANE_COUNT - 1) / 2) * LANE_WIDTH
);

// ─── Motion / difficulty ────────────────────────────────────────────────────
export const START_SPEED = 14;            // world units / second at game start
export const MAX_SPEED = 36;              // speed cap
export const SPEED_RAMP = 0.45;           // speed gained per second of survival
export const LANE_CHANGE_SPEED = 12;      // how fast the player slides between lanes

// ─── Jump ───────────────────────────────────────────────────────────────────
export const GRAVITY = 55;                // downward accel (units/s^2)
export const JUMP_VELOCITY = 16;          // initial upward velocity
export const PLAYER_GROUND_Y = 0.9;       // resting height of player center

// ─── Field / scrolling scenery ──────────────────────────────────────────────
export const YARD_LINE_SPACING = 6;       // distance between yard lines (z)
export const TRACK_LENGTH = 180;          // total scroll length before recycle
export const SPAWN_Z = -TRACK_LENGTH;     // far edge where scenery recycles in
export const DESPAWN_Z = 14;              // past-camera edge where it recycles out

// ─── Obstacles (instruments) ────────────────────────────────────────────────
export const OBSTACLE_SPAWN_Z = -120;     // far z where obstacles fade in
export const SPAWN_GAP_MIN = 16;          // min distance between obstacle rows
export const SPAWN_GAP_MAX = 30;          // max distance between obstacle rows
export const SPAWN_GAP_RAMP = 0.12;       // gap shrinks as speed climbs (harder)
export const COLLISION_Z = 1.0;           // half-depth of the hit window (z)
export const COLLISION_X = 1.1;           // half-width of the hit window (x)

// ─── Notes & Song Meter ─────────────────────────────────────────────────────
export const NOTE_SPAWN_GAP_MIN = 11;     // distance between note trails
export const NOTE_SPAWN_GAP_MAX = 22;
export const NOTES_PER_TRAIL = 4;         // notes in a single collectible run
export const NOTE_TRAIL_SPACING = 3.2;    // z-gap between notes in a trail
export const NOTES_PER_SONG = 12;         // notes needed to fill the Song Meter
export const NOTE_COLLECT_Z = 1.4;        // pickup window half-depth (z)
export const NOTE_COLLECT_X = 1.0;        // pickup window half-width (x)
export const NOTE_COLLECT_Y = 1.3;        // pickup vertical tolerance
export const NOTE_GROUND_Y = 1.1;         // resting height of ground notes
export const NOTE_HIGH_Y = 2.4;           // apex height of an elevated (jump) trail
export const NOTE_ELEVATED_CHANCE = 0.35; // odds a trail arcs up (collect by jumping)
export const NOTE_POINTS = 5;             // yard bonus per note

// ─── Marching Mode (Song Meter reward) ──────────────────────────────────────
export const MARCHING_SPEED_MULT = 1.45;  // speed boost while a tune plays
export const MARCHING_MAX_MS = 9000;      // fallback duration if audio never ends
export const NOTE_MULT_MARCHING = 2;      // notes are worth double in Marching Mode

// Obstacle archetypes. `jumpable` low props can be cleared with a jump;
// tall props must be dodged by switching lanes. `clearH` = how high the player
// must rise (above ground) to clear a jumpable prop.
export const OBSTACLE_TYPES = [
    { id: 'bassDrum', jumpable: true, clearH: 0.7, weight: 3 },
    { id: 'sousaphone', jumpable: false, weight: 2 },
    { id: 'musicStand', jumpable: false, weight: 2 },
];

// ─── Songs (reuse the Name That Tune snippet library) ───────────────────────
// Phase 3 will pull from these when the Song Meter fills.
const SNIP = '/audio/name-that-tune/snippets';
export const SONGS = [
    { title: '2001: A Space Odyssey', src: `${SNIP}/2001_Fanfare_snip.mp3` },
    { title: 'Eye of the Tiger', src: `${SNIP}/Eye_of_the_Tiger_snip.mp3` },
    { title: 'Seven Nation Army', src: `${SNIP}/Seven_Nation_Army_snip.mp3` },
    { title: 'Sing, Sing, Sing', src: `${SNIP}/Sing_Sing_Sing_snip.mp3` },
    { title: 'Star Wars', src: `${SNIP}/Star_Wars_snip.mp3` },
    { title: 'Thriller', src: `${SNIP}/Thriller_snip.mp3` },
];

// ─── Theme colors (match site espresso/copper palette) ──────────────────────
export const COLORS = {
    sky: 0x241a10,
    fog: 0x2a1f12,
    field: 0x3a7544,
    fieldStripe: 0x44864f,
    yardLine: 0xf7f0dc,
    sideline: 0x2a2114,
    player: 0xb87333,
    playerAccent: 0xf5ead2,
    note: 0xf4c430,
    noteStem: 0x8c521a,
};
