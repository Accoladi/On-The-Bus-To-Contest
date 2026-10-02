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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!song) return null;

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };

  const formatTime = (value: number) => `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
  const seek = (value: string) => {
    const nextTime = Number(value);
    if (audioRef.current) audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-[#fffdfa] text-left shadow-sm">
        <div className="relative aspect-[4/3] bg-[#f7f3ea]">
          <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 1024px) 100vw, 320px" className="object-contain" />
        </div>
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)]">From the bus radio</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-tight">{song.title}</p>
          <p className="mt-2 text-sm text-[var(--slate)]">{song.artist || "Listen and read the lyrics"}</p>
          <button type="button" onClick={togglePlayback} disabled={!song.audioUrl} aria-label={`${playing ? "Pause" : "Play"} ${song.title}`} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-4 py-3 text-sm font-bold text-[var(--navy)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--soft-champagne)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60">
            {playing ? <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-current"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10-6.8a1.1 1.1 0 0 0 0-1.8l-10-6.8C8.9 3.9 8 4.4 8 5.2Z" /></svg>}
            {playing ? "Pause song" : "Play song"}
          </button>
          <button type="button" onClick={() => setOpen(true)} className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--purple)] hover:text-[var(--navy)]">Open lyrics and details →</button>
        </div>
        {song.audioUrl && <audio ref={audioRef} src={song.audioUrl} preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setCurrentTime(0); }} />}
      </article>

      {open && <div role="dialog" aria-modal="true" aria-label={song.title} className="fixed inset-0 z-50 grid place-items-center bg-[rgba(7,26,47,.72)] p-4" onClick={() => setOpen(false)}>
        <div className="grid h-[min(90vh,760px)] max-h-[calc(100dvh-2rem)] w-full max-w-4xl min-h-0 overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onClick={(event) => event.stopPropagation()}>
          <div className="min-h-0 overflow-y-auto overscroll-contain bg-[#fffdfa] p-5 sm:p-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--navy)]">
              <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 768px) 100vw, 460px" className="object-contain" />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight">{song.title}</h2>
            <p className="mt-2 text-sm text-[var(--slate)]">{song.artist || "Contest day radio"}</p>
            {song.audioUrl && <div className="mt-6 rounded-2xl border border-[var(--navy)]/10 bg-[#f1f4f7] p-4">
              <div className="flex items-center gap-3">
                <button type="button" onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} ${song.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-sm transition hover:scale-105 hover:bg-[var(--soft-champagne)]">
                  {playing ? <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 translate-x-px fill-current"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10-6.8a1.1 1.1 0 0 0 0-1.8l-10-6.8C8.9 3.9 8 4.4 8 5.2Z" /></svg>}
                </button>
                <div className="min-w-0 flex-1">
                  <input aria-label="Song progress" type="range" min="0" max={duration || song.durationSeconds || 1} step="0.1" value={Math.min(currentTime, duration || song.durationSeconds || 1)} onChange={(event) => seek(event.target.value)} className="h-1.5 w-full cursor-pointer accent-[var(--purple)]" />
                  <div className="mt-1 flex justify-between text-[11px] font-semibold tabular-nums text-[var(--slate)]"><span>{formatTime(currentTime)}</span><span>{formatTime(duration || song.durationSeconds || 0)}</span></div>
                </div>
              </div>
            </div>}
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain border-t border-[var(--navy)]/10 bg-[#f7f9fb] p-5 sm:p-8 md:border-l md:border-t-0">
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
