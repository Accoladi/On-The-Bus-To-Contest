"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type RadioSong = {
  id?: string;
  title?: string;
  artist?: string;
  durationSeconds?: number;
  audioUrl?: string;
  coverImageUrl?: string;
};

const FALLBACK_SONGS: RadioSong[] = [
  { id: "ride", title: "On the Bus", artist: "Good vibes for the road ahead.", coverImageUrl: "/images/home/radio/left-card.png", durationSeconds: 236 },
  { id: "hyped", title: "Get Hyped", artist: "High energy for a stronger performance.", coverImageUrl: "/content/images/radio-cover.jpg", durationSeconds: 218 },
  { id: "field", title: "Chill Before the Field", artist: "Set the mood. Focus your mind.", coverImageUrl: "/images/home/hero/bg.png", durationSeconds: 242 },
  { id: "home", title: "Ride Home", artist: "Reflect. Recharge. Same family.", coverImageUrl: "/images/home/radio/left-card.png", durationSeconds: 204 },
];

function formatTime(seconds = 0) {
  if (!seconds) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function PlayIcon({ paused = false }: { paused?: boolean }) {
  return paused ? <span aria-hidden="true" className="text-lg">▶</span> : <span aria-hidden="true" className="text-lg">Ⅱ</span>;
}

function Waveform() {
  return <div className="flex h-14 items-center gap-1.5 opacity-75" aria-hidden="true">{[18, 28, 38, 22, 32, 44, 27, 52, 38, 28, 46, 34, 22, 40, 30, 48, 36, 25, 43, 31, 20, 38, 49, 29].map((height, index) => <span key={index} className="w-1 rounded-full bg-[var(--gold)]" style={{ height: `${height}px` }} />)}</div>;
}

export function RadioSection() {
  const [songs, setSongs] = useState<RadioSong[]>(FALLBACK_SONGS.slice(0, 2));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resolvedDuration, setResolvedDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeSong = songs[activeIndex] || FALLBACK_SONGS[0];

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/radio/songs", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { songs?: RadioSong[] } | null) => {
        const nextSongs = payload?.songs?.filter((song) => song.title && song.coverImageUrl).slice(0, 2);
        if (nextSongs?.length) setSongs(nextSongs);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const trackProgress = useMemo(() => isPlaying ? "42%" : "0%", [isPlaying]);
  const companionSongs = songs.filter((_, index) => index !== activeIndex).slice(0, 1);

  function selectTrack(index: number) {
    setIsPlaying(false);
    setResolvedDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveIndex(index);
  }

  function togglePlayback() {
    if (!activeSong.audioUrl || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }

  return (
    <section id="radio" className="relative isolate scroll-mt-8 overflow-hidden bg-[var(--navy)] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <Image src="/images/home/radio/bg.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-auto grid max-w-[1440px] items-stretch gap-8 lg:grid-cols-[minmax(0,.84fr)_minmax(0,1.16fr)] lg:gap-10 xl:gap-14">
        <div className="relative min-h-[520px] overflow-hidden rounded-[26px] border-[3px] border-[var(--gold)] bg-[var(--navy)] shadow-[0_18px_50px_rgba(7,26,47,.14)] sm:min-h-[650px] lg:min-h-0">
          <Image src="/images/home/radio/left-card.png" alt="A marching band student listening to music on the bus" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,47,.9)] via-transparent to-transparent" />
          <p className="absolute bottom-7 left-7 max-w-[170px] rotate-[-7deg] font-[family-name:var(--font-display)] text-3xl leading-[.9] text-[var(--champagne)]/90 sm:bottom-10 sm:left-10 sm:text-4xl">Same<br />Music.<br />Further<br />Together.</p>
        </div>

        <div className="flex flex-col justify-center py-2 lg:py-8">
          <div className="flex items-center gap-4"><p className="text-xs font-bold uppercase tracking-[0.36em] text-[var(--champagne)]">Radio</p><span className="h-px w-12 bg-[var(--gold)]" /></div>
          <h2 className="mt-6 max-w-xl text-5xl leading-[.88] sm:text-6xl lg:text-[4.7rem]">Your Soundtrack<br />for the Ride</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">Curated songs for the bus ride, downtime, warm-up, and the ride home. Different moments. Same band spirit.</p>

          <div className="mt-8 rounded-[20px] bg-[#f4f5f7] p-5 text-[var(--navy)] shadow-[0_16px_30px_rgba(7,26,47,.18)] sm:p-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white/10 sm:h-28 sm:w-28"><Image src={activeSong.coverImageUrl || "/images/home/radio/left-card.png"} alt="" fill sizes="112px" className="object-cover" /></div>
              <div className="min-w-0 flex-1"><p className="truncate text-2xl font-semibold sm:text-3xl">{activeSong.title}</p><p className="mt-1 truncate text-sm text-[var(--slate)] sm:text-base">{activeSong.artist}</p></div>
              <div className="flex items-center gap-3"><button type="button" onClick={() => selectTrack((activeIndex - 1 + songs.length) % songs.length)} aria-label="Previous track" className="hidden text-xl text-[var(--navy)]/70 transition hover:text-[var(--purple)] sm:block">l◀</button><button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause track" : "Play track"} className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-white transition hover:bg-[var(--purple)]"><PlayIcon paused={!isPlaying} /></button><button type="button" onClick={() => selectTrack((activeIndex + 1) % songs.length)} aria-label="Next track" className="hidden text-xl text-[var(--navy)]/70 transition hover:text-[var(--purple)] sm:block">▶l</button></div>
            </div>
            <div className="mt-4"><div className="h-1 rounded-full bg-[var(--navy)]/15"><div className="h-1 rounded-full bg-[var(--gold)] transition-all" style={{ width: trackProgress }} /></div><div className="mt-2 flex justify-between text-xs text-[var(--slate)]"><span>0:00</span><span>{formatTime(resolvedDuration || activeSong.durationSeconds)}</span></div></div>
            <audio ref={audioRef} src={activeSong.audioUrl} onLoadedMetadata={(event) => { const nextDuration = event.currentTarget.duration; if (Number.isFinite(nextDuration)) setResolvedDuration(nextDuration); }} onEnded={() => setIsPlaying(false)} preload="metadata" />
          </div>

          <div className="mt-5 space-y-3">{companionSongs.map((song) => { const index = songs.indexOf(song); return <button key={song.id || `${song.title}-${index}`} type="button" onClick={() => selectTrack(index)} className="group flex w-full items-center gap-5 rounded-2xl border border-transparent bg-white/90 px-5 py-5 text-left text-[var(--navy)] transition hover:border-[var(--gold)] hover:bg-white"><div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg"><Image src={song.coverImageUrl || "/images/home/radio/left-card.png"} alt="" fill sizes="96px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate font-[family-name:var(--font-display)] text-2xl leading-none">{song.title}</p><p className="mt-2 truncate text-sm text-[var(--slate)] sm:text-base">{song.artist}</p></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ece6d9] text-lg text-[var(--navy)] transition group-hover:bg-[var(--gold)]" aria-hidden="true">▶</span></button>; })}</div>

          <div className="mt-8 flex items-center justify-between gap-4"><div className="hidden sm:block"><Waveform /></div><Link href="/listen" className="inline-flex items-center gap-3 rounded-full bg-[var(--purple)] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--navy)]">Explore radio <span aria-hidden="true">→</span></Link></div>
        </div>
      </div>
    </section>
  );
}
