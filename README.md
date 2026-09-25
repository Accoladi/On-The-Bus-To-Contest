# On the Bus to Contest

The shared contest-day companion platform for marching-band students, families, staff, and fans.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Supabase for database, authentication, storage, and server functions
- Temporary radio catalog proxy backed by the BandCampNation radio API

## Asset locations

- `public/images/` — bundled images referenced as `/images/example.jpg`
- `public/audio/` — bundled audio files referenced as `/audio/example.mp3`
- `public/documents/` — bundled PDFs and downloadable documents
- Supabase Storage — user uploads, admin-managed media, and files that should not be committed to Git

## Temporary radio integration

The app exposes `GET /api/radio/songs`. The server fetches the radio catalog from `RADIO_UPSTREAM_URL`, caches it briefly, validates the response shape, and returns it to the browser. Client components should call the local endpoint rather than calling the upstream API directly.

## Local development

1. Copy `.env.example` to `.env.local` and add the Supabase project values.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.
