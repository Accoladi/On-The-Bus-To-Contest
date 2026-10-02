"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FormattedLyrics } from "@/components/radio/RadioExtras";
import type { RadioSong } from "@/components/radio/types";

const normalizeSongTitle = (value: string) =>
  value.toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();

export function PersonBesideSongCard({ songTitle = "We Just Need Each Other" }: { songTitle?: string }) {
  const [song, setSong] = useState<RadioSong | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-[#fffdfa] text-left shadow-sm">
        <div className="relative aspect-[16/9] bg-[var(--navy)]">
          <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 1024px) 100vw, 320px" className="object-contain" />
          <button type="button" onClick={togglePlayback} disabled={!song.audioUrl} aria-label={`${playing ? "Pause" : "Play"} ${song.title}`} className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60">
            {playing ? <span className="text-lg leading-none">Ⅱ</span> : <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 translate-x-px fill-current"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10-6.8a1.1 1.1 0 0 0 0-1.8l-10-6.8C8.9 3.9 8 4.4 8 5.2Z" /></svg>}
          </button>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)]">From the bus radio</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-tight">{song.title}</p>
          <p className="mt-2 text-sm text-[var(--slate)]">{song.artist || "Listen and read the lyrics"}</p>
          <button type="button" onClick={() => setOpen(true)} className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--purple)] hover:text-[var(--navy)]">Open lyrics and details →</button>
        </div>
        {song.audioUrl && <audio ref={audioRef} src={song.audioUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />}
      </article>

      {open && <div role="dialog" aria-modal="true" aria-label={song.title} className="fixed inset-0 z-50 grid place-items-center bg-[rgba(7,26,47,.72)] p-4" onClick={() => setOpen(false)}>
        <div className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onClick={(event) => event.stopPropagation()}>
          <div className="p-5 sm:p-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--navy)]">
              <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 768px) 100vw, 460px" className="object-contain" />
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
