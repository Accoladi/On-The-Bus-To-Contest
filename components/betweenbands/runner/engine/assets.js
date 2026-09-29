// ============================================================================
// engine/assets.js — GLTF model registry + loader (Phase 5 pipeline)
// ============================================================================
//
// Loads the AI-generated .glb models for Halftime Hustle and normalizes them so
// they drop in regardless of how the authoring tool exported scale/origin.
//
// Graceful fallback: if a file is missing or fails to parse, the loader resolves
// to `null` and the engine keeps using its primitive placeholder for that asset.
// Nothing here ever throws — the game runs with whatever models happen to exist.
//
// Drop model files into:  /public/models/runner/
// See:  src/components/runner/MODELS.md  for the full authoring spec.
// ============================================================================

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const MODELS_BASE = '/models/runner';

// Logical asset → file + normalization config.
//   targetHeight : world-unit height the model is scaled to (Y axis)
//   anchor       : 'bottom' sits feet/base at y=0; 'center' centers on origin
//   yaw          : extra Y rotation (radians) if the model faces the wrong way
//   animated     : true → keep animation clips + drive an AnimationMixer
export const MODEL_ASSETS = {
    player:     { file: 'student.glb',     targetHeight: 2.2, anchor: 'bottom', yaw: 0, animated: true },
    bassDrum:   { file: 'bass-drum.glb',   targetHeight: 1.4, anchor: 'bottom', yaw: 0 },
    sousaphone: { file: 'sousaphone.glb',  targetHeight: 2.4, anchor: 'bottom', yaw: 0 },
    musicStand: { file: 'music-stand.glb', targetHeight: 1.8, anchor: 'bottom', yaw: 0 },
    note:       { file: 'note.glb',        targetHeight: 0.9, anchor: 'center', yaw: 0 },
};

const _loader = new GLTFLoader();

/**
 * Scale a loaded model to a target height and re-anchor its pivot, baking the
 * transform into a wrapper Group so clones/positioning stay predictable.
 * @returns {THREE.Group}
 */
function normalize(scene, cfg) {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scale = size.y > 0 ? cfg.targetHeight / size.y : 1;
    scene.scale.multiplyScalar(scale);
    if (cfg.yaw) scene.rotation.y += cfg.yaw;

    // Re-measure after scaling, then translate to the requested anchor.
    const box2 = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box2.getCenter(center);
    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= cfg.anchor === 'bottom' ? box2.min.y : center.y;

    scene.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });

    const wrapper = new THREE.Group();
    wrapper.add(scene);
    return wrapper;
}

/**
 * Load a single model by key. Never rejects — resolves `{ scene, animations }`
 * on success, or `null` if the file is absent/unreadable (→ primitive fallback).
 * @param {string} key  a key of MODEL_ASSETS
 * @returns {Promise<{scene: THREE.Group, animations: THREE.AnimationClip[]}|null>}
 */
export function loadModelAsset(key) {
    const cfg = MODEL_ASSETS[key];
    if (!cfg) return Promise.resolve(null);
    const url = `${MODELS_BASE}/${cfg.file}`;

    return new Promise(resolve => {
        _loader.load(
            url,
            gltf => {
                try {
                    const scene = normalize(gltf.scene, cfg);
                    resolve({ scene, animations: gltf.animations || [] });
                } catch (e) {
                    resolve(null); // malformed model → fall back
                }
            },
            undefined,
            () => resolve(null) // 404 / network / parse error → fall back
        );
    });
}
