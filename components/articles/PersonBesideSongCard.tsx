"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FormattedLyrics } from "@/components/radio/RadioExtras";
import type { RadioSong } from "@/components/radio/types";

const normalizeSongTitle = (value: string) =>
  value.toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();

export function PersonBesideSongCard({ songTitle = "We Just Need Each Other" }: { songTitle?: string }) {
  const [song, setSong] = useState<RadioSong | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/radio/songs", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { songs?: RadioSong[] } | null) => {
        const match = payload?.songs?.find((item) => normalizeSongTitle(item.title) === normalizeSongTitle(songTitle));
        if (match) setSong(match);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [songTitle]);

  if (!song) return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="w-full overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-[#fffdfa] text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-square bg-[var(--navy)]">
          <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="288px" className="object-cover" />
        </div>
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)]">From the bus radio</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-tight">{song.title}</p>
          <p className="mt-2 text-sm text-[var(--slate)]">{song.artist || "Listen and read the lyrics"}</p>
        </div>
      </button>

      {open && <div role="dialog" aria-modal="true" aria-label={song.title} className="fixed inset-0 z-50 grid place-items-center bg-[rgba(7,26,47,.72)] p-4" onClick={() => setOpen(false)}>
        <div className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onClick={(event) => event.stopPropagation()}>
          <div className="p-5 sm:p-8">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--navy)]">
              <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 768px) 100vw, 460px" className="object-cover" />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight">{song.title}</h2>
            <p className="mt-2 text-sm text-[var(--slate)]">{song.artist || "Contest day radio"}</p>
            {song.audioUrl && <audio className="mt-5 w-full" controls src={song.audioUrl} />}
          </div>
          <div className="min-h-0 overflow-y-auto border-t border-[var(--navy)]/10 p-5 sm:p-8 md:border-l md:border-t-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-[family-name:var(--font-display)] text-2xl">Lyrics</h3>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1 text-2xl leading-none text-[var(--slate)] hover:bg-[#f7f3ea]" aria-label="Close song">×</button>
            </div>
            <FormattedLyrics lyrics={song.lyrics} />
          </div>
        </div>
      </div>}
    </>
  );
}
