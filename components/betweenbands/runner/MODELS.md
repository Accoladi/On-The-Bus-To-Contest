# Halftime Hustle — 3D Model Asset Spec

Drop the AI-generated models here:

```
public/models/runner/
├── student.glb        ← the running player (rigged + animated)
├── bass-drum.glb      ← jumpable low obstacle
├── sousaphone.glb     ← tall dodge obstacle
├── music-stand.glb    ← tall dodge obstacle
└── note.glb           ← collectible music note
```

The game already runs without these files — it uses primitive placeholders and
**automatically swaps in each `.glb` the moment it exists**. You can add them one
at a time; a missing or broken file just keeps its placeholder (no errors).

The registry that maps these files lives in
[`engine/assets.js`](engine/assets.js) (`MODEL_ASSETS`). Change a filename or
tuning value there if needed.

---

## Universal requirements

| Requirement | Value |
|---|---|
| Format | **glTF binary (`.glb`)**, single self-contained file (textures embedded) |
| Up axis | **Y-up** (glTF standard) |
| Forward axis | Model **faces −Z** (away from the camera, the running direction). If yours faces +Z, set `yaw: Math.PI` for it in `MODEL_ASSETS`. |
| Origin | Roughly centered on X/Z. Exact scale & pivot are **auto-normalized** at load (scaled to a target height, feet/base dropped to the ground), so don't stress about export units. |
| Poly budget | ≤ ~8k triangles each (note ≤ 1k). This is a kids' web game on phones — keep it light. |
| Textures | ≤ 1024×1024, baked. One material set per model preferred. |
| Materials | Standard PBR (metalRough). The brass instruments look best with some metalness. |
| File size | Aim ≤ 1–2 MB each. |

A material with an **emissive** channel will glow gold automatically during
Marching Mode (handled by the engine) — no special setup needed.

---

## Per-model notes

### `student.glb` — the player ⭐ (the only rigged one)
- A marching-band student / drum-major character.
- **Must be rigged with a looping run/jog animation.** The engine picks the clip
  whose name matches `run`, `jog`, or `sprint` (case-insensitive); otherwise it
  plays the first clip. Name it **`Run`** to be safe.
- Auto-scaled to ~2.2 units tall. Faces −Z (we see its back as it runs away).
- Optional extra clips (`Jump`, `Idle`) are fine but not yet used.

### `bass-drum.glb` — jumpable obstacle
- A marching bass drum (ideally oriented as a low hurdle the runner leaps).
- Auto-scaled to ~1.4 units tall. **Static** (no rig).

### `sousaphone.glb` — tall obstacle
- A sousaphone/tuba. Auto-scaled to ~2.4 units tall. **Static**.

### `music-stand.glb` — tall obstacle
- A music stand. Auto-scaled to ~1.8 units tall. **Static**.

### `note.glb` — collectible
- A single music note (quarter/eighth). Auto-scaled to ~0.9 units, centered on
  its origin (it spins in place). **Static**. A gold/emissive look fits the theme.
- Keep it very low-poly — many spawn at once.

---

## How to verify after dropping a file in
1. `npm run dev`, open `/halftime-hustle`, press Start.
2. The placeholder for that asset should be replaced by your model.
3. If it doesn't appear: check the **filename matches exactly**, it's a valid
   `.glb`, and (for the student) that it has an animation clip. A bad file
   silently falls back to the placeholder — check the browser console/network
   tab for the 404 or parse error.

Tuning (target heights, `yaw`, anchors) is all in `MODEL_ASSETS` in
[`engine/assets.js`](engine/assets.js).
