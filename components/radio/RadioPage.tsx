"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { FormattedLyrics, LyricAdBanner, SongPromoBanner } from "@/components/radio/RadioExtras";
import type { RadioSong } from "@/components/radio/types";

const PAGE_SIZE = 12;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function Icon({ name, size = 20, fill = "none" }: { name: "play" | "pause" | "heart" | "share" | "skip-back" | "skip-forward" | "repeat" | "volume"; size?: number; fill?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill, stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "play") return <svg {...common}><path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" /></svg>;
  if (name === "pause") return <svg {...common}><path d="M8 5v14M16 5v14" strokeWidth="3" /></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" /></svg>;
  if (name === "share") return <svg {...common}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></svg>;
  if (name === "skip-back") return <svg {...common}><path d="m19 5-9 7 9 7V5ZM5 5v14" /></svg>;
  if (name === "skip-forward") return <svg {...common}><path d="m5 5 9 7-9 7V5Zm14 0v14" /></svg>;
  if (name === "repeat") return <svg {...common}><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" /></svg>;
  return <svg {...common}><path d="M11 5a7 7 0 0 0 0 14M15 8a4 4 0 0 1 0 8M19 2a11 11 0 0 1 0 20M7 9v6" /></svg>;
}

function filterSongs(songs: RadioSong[]) {
  return songs.filter((song) => song?.title && song.status !== "draft" && !song.isRestricted);
}

const coverCredits: Record<string, string> = {
  "the-people-on-my-band-bus": "Clet Isidore Baptiste",
  "we-just-need-each-other": "Writer credit not shown on cover",
  "just-laugh-a-little": "Jon Murpherson",
  "breath-into-the-blue": "Wilkerson McAlister · Euphonium Soloist",
  "the-field-is-waiting": "Accoladi Symphonic Orchestra · Cromer Crain Euphonium Soloist",
  "stillness-between-heartbeats": "Accoladi String Quartet · Hyuk Kim Soprano Saxophone Soloist",
  "before-the-stadium-wakes": "Accoladi Symphonic Orchestra",
};

function getSongCredit(song: RadioSong) {
  return coverCredits[song.id] || song.artist || "Contest day radio";
}

function TrackCard({ song, index, active, playing, liked, displayDuration, onDuration, onPlay, onLike, onShare }: { song: RadioSong; index: number; active: boolean; playing: boolean; liked: boolean; displayDuration?: number; onDuration: (duration: number) => void; onPlay: () => void; onLike: () => void; onShare: () => void }) {
  return (
    <article className={`group mx-auto flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_12px_32px_rgba(7,26,47,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(7,26,47,0.14)] ${active ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/25" : "border-[var(--navy)]/8"}`}>
      {song.audioUrl && <audio src={song.audioUrl} preload="metadata" className="hidden" onLoadedMetadata={(event) => { const nextDuration = event.currentTarget.duration; if (Number.isFinite(nextDuration)) onDuration(nextDuration); }} />}
      <button type="button" onClick={onPlay} className="relative aspect-[4/3] overflow-hidden bg-[var(--navy)] text-left">
        <Image src={song.coverImageUrl || "/content/images/radio-cover.jpg"} alt={`${song.title} cover`} fill sizes="(max-width: 768px) 100vw, 33vw" className="bg-[var(--navy)] object-cover object-center transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,47,.8)] via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[rgba(7,26,47,.65)] px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-white backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
        {active && <span className="absolute right-3 top-3 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[var(--navy)]">{playing ? "Playing" : "Paused"}</span>}
        <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-lg transition group-hover:scale-105">{active && playing ? <Icon name="pause" size={18} /> : <Icon name="play" size={18} fill="currentColor" />}</span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl leading-tight text-[var(--navy)]">{song.title}</h3>
        <p className="mt-1 text-sm text-[var(--slate)]">{getSongCredit(song)}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs font-semibold text-[var(--slate)]">{formatTime(displayDuration || song.durationSeconds || 0)}</span>
          <div className="flex gap-1">
            <button type="button" onClick={onLike} aria-label={liked ? "Unlike song" : "Like song"} className={`rounded-full p-2 transition hover:bg-[var(--cream)] ${liked ? "text-[#bd4d63]" : "text-[var(--slate)]/40 hover:text-[#bd4d63]"}`}><Icon name="heart" size={18} fill={liked ? "currentColor" : "none"} /></button>
            <button type="button" onClick={onShare} aria-label="Share song" className="rounded-full p-2 text-[var(--slate)]/40 transition hover:bg-[var(--cream)] hover:text-[var(--purple)]"><Icon name="share" size={18} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RadioPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSongRef = useRef<RadioSong | null>(null);
  const songsRef = useRef<RadioSong[]>([]);
  const [songs, setSongs] = useState<RadioSong[]>([]);
  const [currentSong, setCurrentSong] = useState<RadioSong | null>(null);
  const [playing, setPlaying] = useState(false);
  const [looped, setLooped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(80);
  const [sort, setSort] = useState<"default" | "az" | "za">("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [liked, setLiked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("on-the-bus-liked-radio") || "[]")); } catch { return new Set(); }
  });
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/radio/songs", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Unable to load radio"); return response.json(); })
      .then((payload: { songs?: RadioSong[] }) => { const nextSongs = filterSongs(payload.songs || []); songsRef.current = nextSongs; setSongs(nextSongs); })
      .catch((requestError) => { if (requestError.name !== "AbortError") setError("Radio is temporarily unavailable."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (!songs.length) return;
    const metadataPlayers = songs
      .filter((song) => song.audioUrl && !durations[song.id])
      .map((song) => {
        const metadataAudio = new Audio();
        metadataAudio.preload = "metadata";
        const onMetadata = () => {
          if (Number.isFinite(metadataAudio.duration)) {
            setDurations((previous) => ({ ...previous, [song.id]: metadataAudio.duration }));
          }
        };
        metadataAudio.addEventListener("loadedmetadata", onMetadata);
        metadataAudio.src = song.audioUrl || "";
        return { metadataAudio, onMetadata };
      });
    return () => metadataPlayers.forEach(({ metadataAudio, onMetadata }) => {
      metadataAudio.removeEventListener("loadedmetadata", onMetadata);
      metadataAudio.src = "";
    });
  }, [songs, durations]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;
    const sync = () => { const nextDuration = Number.isFinite(audio.duration) ? audio.duration : 0; setDuration(nextDuration); if (nextDuration && currentSongRef.current) setDurations((previous) => ({ ...previous, [currentSongRef.current!.id]: nextDuration })); setCurrentTime(audio.currentTime || 0); setProgress(nextDuration ? (audio.currentTime / nextDuration) * 100 : 0); };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      if (audio.loop) return;
      const queue = songsRef.current;
      const index = queue.findIndex((song) => song.id === currentSongRef.current?.id);
      const next = queue[index + 1];
      if (next) { currentSongRef.current = next; audio.src = next.audioUrl || ""; setCurrentSong(next); audio.play().catch(() => undefined); }
    };
    const onError = () => { setPlaying(false); setError("This track could not be played."); };
    audio.addEventListener("timeupdate", sync); audio.addEventListener("loadedmetadata", sync); audio.addEventListener("play", onPlay); audio.addEventListener("pause", onPause); audio.addEventListener("ended", onEnded); audio.addEventListener("error", onError);
    return () => { audio.pause(); audio.removeEventListener("timeupdate", sync); audio.removeEventListener("loadedmetadata", sync); audio.removeEventListener("play", onPlay); audio.removeEventListener("pause", onPause); audio.removeEventListener("ended", onEnded); audio.removeEventListener("error", onError); };
  }, []);

  const playSong = useCallback((song: RadioSong) => {
    const audio = audioRef.current;
    if (!audio || !song.audioUrl) return;
    if (currentSong?.id === song.id) { setIsExpanded(true); if (audio.paused) audio.play().catch(() => setError("Tap play again to start this track.")); else audio.pause(); return; }
    currentSongRef.current = song; setCurrentSong(song); setIsExpanded(true); setCurrentTime(0); setProgress(0); setError(""); audio.src = song.audioUrl; audio.load(); audio.play().catch(() => setError("Tap play again to start this track."));
  }, [currentSong]);

  const sortedSongs = useMemo(() => {
    const list = [...songs];
    if (sort === "az") return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") return list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [songs, sort]);
  const featured = songs[0];
  const visibleSongs = sortedSongs.slice(0, visibleCount);
  const toggleLike = (id: string) => setLiked((previous) => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); localStorage.setItem("on-the-bus-liked-radio", JSON.stringify([...next])); return next; });
  const shareSong = async (song: RadioSong) => { try { await navigator.clipboard.writeText(`${window.location.origin}/listen?song=${encodeURIComponent(song.slug || song.id)}`); } catch { /* clipboard is optional */ } };
  const skip = (direction: 1 | -1) => { if (!currentSong) return; const index = songs.findIndex((song) => song.id === currentSong.id); const next = songs[index + direction]; if (next) playSong(next); };
  const seekTo = (nextProgress: number) => { const audio = audioRef.current; if (audio?.duration) audio.currentTime = (Math.max(0, Math.min(100, nextProgress)) / 100) * audio.duration; };
  const closePlayer = () => { audioRef.current?.pause(); currentSongRef.current = null; setCurrentSong(null); setPlaying(false); setIsExpanded(false); };

  return (
    <main className="min-h-screen bg-[var(--cream)] pb-32 text-[var(--navy)]">
      <div className="relative isolate overflow-visible bg-[var(--navy)]">
        <div className="absolute inset-x-0 bottom-0 top-[76px] z-0">
          <Image src="/images/radio/bg.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,47,.64)_0%,rgba(7,26,47,.34)_52%,rgba(7,26,47,.1)_100%)]" />
        </div>
        <SiteNav solid />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-44 pt-44 sm:px-10 lg:px-16 lg:pb-52 lg:pt-52">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]">The soundtrack between performances</p>
          <h1 className="mt-5 max-w-3xl text-6xl leading-[0.92] text-[var(--cream)] sm:text-7xl lg:text-8xl">Turn the ride up.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">Original tracks, band-room energy, and something good in your headphones while the stadium gets ready.</p>
        </div>
      </div>

      {featured && (
        <section className="relative z-20 mx-auto -mt-28 max-w-[1540px] px-4 sm:px-8 lg:px-8">
          <div className="relative overflow-hidden rounded-[26px] border border-white/20 bg-[rgba(25,24,66,.88)] text-white shadow-[0_24px_70px_rgba(7,26,47,0.3)] backdrop-blur-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(231,184,75,.2),transparent_32%)]" />
            <div className="relative grid items-stretch gap-0 p-0 md:grid-cols-[44%_56%] lg:grid-cols-[42%_58%]">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/15 bg-[var(--navy)] md:aspect-auto md:min-h-[280px] md:border-b-0 md:border-r md:border-white/15"><Image src={featured.coverImageUrl || "/content/images/radio-cover.jpg"} alt={featured.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1200px) 44vw, 640px" className="object-cover object-center" /></div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="inline-flex w-fit rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--navy)]">Featured track</span>
                <h2 className="mt-5 max-w-xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{featured.title}</h2>
                <p className="mt-3 text-lg text-white/65">{getSongCredit(featured)}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => playSong(featured)} className="flex items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3.5 font-bold text-[var(--navy)] transition hover:bg-[var(--champagne)]">
                    {currentSong?.id === featured.id && playing ? <Icon name="pause" size={18} /> : <Icon name="play" size={18} fill="currentColor" />} {currentSong?.id === featured.id && playing ? "Pause" : "Play now"}
                  </button>
                  <button type="button" onClick={() => toggleLike(featured.id)} aria-label="Like featured song" className={`flex h-12 w-12 items-center justify-center rounded-full ${liked.has(featured.id) ? "bg-[#bd4d63]" : "bg-white/15"}`}>
                    <Icon name="heart" fill={liked.has(featured.id) ? "currentColor" : "none"} />
                  </button>
                  <button type="button" onClick={() => setLooped((value) => { if (audioRef.current) audioRef.current.loop = !value; return !value; })} aria-label="Loop current song" className={`flex h-12 w-12 items-center justify-center rounded-full ${looped ? "bg-[var(--gold)] text-[var(--navy)]" : "bg-white/15"}`}>
                    <Icon name="repeat" size={19} />
                  </button>
                  <button type="button" onClick={() => shareSong(featured)} aria-label="Share featured song" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                    <Icon name="share" size={19} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1320px] px-6 pb-16 pt-14 sm:px-10 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="flex flex-col gap-5 border-b border-[var(--navy)]/12 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--purple)]">Keep exploring</p><h2 className="mt-3 text-4xl sm:text-5xl">All tracks</h2><p className="mt-2 text-sm text-[var(--slate)]">Stream, save, and share your favorites.</p></div><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-[var(--champagne)] px-4 py-2 text-xs font-bold text-[var(--navy)]">{sortedSongs.length} tracks</span><div className="flex rounded-full border border-[var(--navy)]/10 bg-white p-1"><button type="button" onClick={() => setSort("default")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${sort === "default" ? "bg-[var(--navy)] text-white" : "text-[var(--slate)]"}`}>Featured</button><button type="button" onClick={() => setSort("az")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${sort === "az" ? "bg-[var(--navy)] text-white" : "text-[var(--slate)]"}`}>A–Z</button><button type="button" onClick={() => setSort("za")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${sort === "za" ? "bg-[var(--navy)] text-white" : "text-[var(--slate)]"}`}>Z–A</button></div></div></div>
        {loading && <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3"><div className="h-80 animate-pulse rounded-[22px] bg-white/70" /><div className="h-80 animate-pulse rounded-[22px] bg-white/70" /><div className="h-80 animate-pulse rounded-[22px] bg-white/70" /></div>}
        {error && <div className="mt-8 rounded-[22px] border border-dashed border-[var(--purple)]/30 bg-white p-12 text-center text-[var(--slate)]">{error}</div>}
        {!loading && !error && !songs.length && <div className="mt-8 rounded-[22px] border border-dashed border-[var(--purple)]/30 bg-white p-12 text-center text-[var(--slate)]">The catalog is ready for its first tracks.</div>}
        {!loading && !error && songs.length > 0 && <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">{visibleSongs.map((song, index) => <TrackCard key={song.id} song={song} index={index} displayDuration={durations[song.id]} onDuration={(nextDuration) => setDurations((previous) => ({ ...previous, [song.id]: nextDuration }))} active={currentSong?.id === song.id} playing={playing} liked={liked.has(song.id)} onPlay={() => playSong(song)} onLike={() => toggleLike(song.id)} onShare={() => shareSong(song)} />)}</div>}
        {!loading && visibleCount < sortedSongs.length && <div className="flex justify-center pt-10"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-full border-2 border-[var(--navy)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--navy)] hover:text-white">Load more tracks</button></div>}
      </section>

      {currentSong && isExpanded && <>
        <button type="button" aria-label="Close expanded player" onClick={() => setIsExpanded(false)} className="fixed inset-0 z-40 bg-[rgba(7,26,47,.55)] backdrop-blur-sm" />
        <section className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[94vh] w-full max-w-[1280px] overflow-hidden rounded-t-[28px] border border-white/15 bg-[var(--cream)] text-[var(--navy)] shadow-[0_-24px_80px_rgba(7,26,47,.35)]">
          <header className="flex items-center justify-between border-b border-[var(--navy)]/10 bg-white/70 px-5 py-4 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[var(--purple)]">Now playing</p><h2 className="mt-1 max-w-[60vw] truncate text-xl">{currentSong.title}</h2></div><div className="flex items-center gap-2"><button type="button" onClick={() => setIsExpanded(false)} aria-label="Minimize player" className="rounded-full px-3 py-2 text-sm font-bold text-[var(--slate)] hover:bg-[var(--cream)]">Minimize</button><button type="button" onClick={closePlayer} aria-label="Close player" className="rounded-full px-3 py-2 text-xl leading-none text-[var(--slate)] hover:bg-[var(--cream)]">×</button></div></header>
          <div className="grid max-h-[calc(94vh-76px)] gap-0 overflow-y-auto lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
            <div className="p-5 sm:p-8 lg:max-h-[calc(94vh-76px)] lg:overflow-y-auto"><div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-[var(--navy)] shadow-xl"><Image src={currentSong.coverImageUrl || "/content/images/radio-cover.jpg"} alt={currentSong.title} fill sizes="(max-width: 1024px) 100vw, 700px" className="object-contain" /></div><SongPromoBanner promo={currentSong.promo} /><div className="mt-7"><h3 className="text-3xl sm:text-4xl">{currentSong.title}</h3><p className="mt-2 text-base text-[var(--slate)]">{getSongCredit(currentSong)}</p></div><div className="mt-6"><input aria-label="Seek song" type="range" min="0" max="100" value={progress} onChange={(event) => seekTo(Number(event.target.value))} className="h-2 w-full accent-[var(--purple)]" /><div className="mt-2 flex justify-between text-xs font-semibold text-[var(--slate)]"><span>{formatTime(currentTime)}</span><span>{formatTime(duration || currentSong.durationSeconds || 0)}</span></div></div><div className="mt-5 flex items-center justify-center gap-4 sm:gap-7"><button type="button" onClick={() => skip(-1)} aria-label="Previous track" className="rounded-full p-3 text-[var(--slate)] hover:bg-white"><Icon name="skip-back" size={22} /></button><button type="button" onClick={() => playSong(currentSong)} aria-label={playing ? "Pause" : "Play"} className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--purple)] text-white shadow-lg shadow-[var(--purple)]/25"><Icon name={playing ? "pause" : "play"} size={23} fill={playing ? "none" : "currentColor"} /></button><button type="button" onClick={() => skip(1)} aria-label="Next track" className="rounded-full p-3 text-[var(--slate)] hover:bg-white"><Icon name="skip-forward" size={22} /></button></div><div className="mt-5 flex flex-wrap items-center justify-center gap-3"><button type="button" onClick={() => seekTo(0)} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[var(--slate)]">Replay</button><button type="button" onClick={() => setLooped((value) => { if (audioRef.current) audioRef.current.loop = !value; return !value; })} className={`rounded-full px-4 py-2 text-xs font-bold ${looped ? "bg-[var(--gold)] text-[var(--navy)]" : "bg-white text-[var(--slate)]"}`}>Loop</button><button type="button" onClick={() => toggleLike(currentSong.id)} className={`rounded-full px-4 py-2 text-xs font-bold ${liked.has(currentSong.id) ? "bg-[#bd4d63] text-white" : "bg-white text-[var(--slate)]"}`}>{liked.has(currentSong.id) ? "Liked" : "Like"}</button><label className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[var(--slate)]"><Icon name="volume" size={16} /><input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-20 accent-[var(--purple)]" /></label></div>{error && <p className="mt-4 text-center text-sm font-semibold text-[#bd4d63]">{error}</p>}</div>
            <aside className="border-t border-[var(--navy)]/10 bg-white/70 p-5 sm:p-8 lg:max-h-[calc(94vh-76px)] lg:overflow-y-auto"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[var(--purple)]">Words behind the music</p><h3 className="mt-2 text-2xl">Lyrics</h3></div><span className="max-w-[55%] rounded-full bg-[var(--champagne)] px-3 py-1 text-right text-[10px] font-bold uppercase tracking-[.16em]">{getSongCredit(currentSong)}</span></div><FormattedLyrics lyrics={currentSong.lyrics} /><LyricAdBanner song={currentSong} /></aside>
          </div>
        </section>
      </>}
      {currentSong && <section onClick={() => setIsExpanded(true)} role="button" tabIndex={0} aria-label="Open expanded player" className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-[1120px] cursor-pointer overflow-hidden rounded-[20px] border border-white/20 bg-[rgba(7,26,47,.96)] text-white shadow-[0_20px_60px_rgba(7,26,47,.3)] backdrop-blur-xl"><div className="h-1 bg-white/10"><div className="h-full bg-[var(--gold)] transition-[width]" style={{ width: `${progress}%` }} /></div><div className="flex items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6"><div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--navy)]"><Image src={currentSong.coverImageUrl || "/content/images/radio-cover.jpg"} alt="" fill sizes="64px" className="object-contain" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{currentSong.title}</p><p className="truncate text-xs text-white/55">{getSongCredit(currentSong)}</p></div><div className="hidden items-center gap-3 text-xs text-white/50 sm:flex"><span>{formatTime(currentTime)}</span><span>/</span><span>{formatTime(duration || currentSong.durationSeconds || 0)}</span></div><button type="button" onClick={(event) => { event.stopPropagation(); skip(-1); }} aria-label="Previous track" className="hidden text-white/70 hover:text-[var(--gold)] sm:block"><Icon name="skip-back" size={19} /></button><button type="button" onClick={(event) => { event.stopPropagation(); playSong(currentSong); }} aria-label={playing ? "Pause" : "Play"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)]"><Icon name={playing ? "pause" : "play"} size={18} fill={playing ? "none" : "currentColor"} /></button><button type="button" onClick={(event) => { event.stopPropagation(); skip(1); }} aria-label="Next track" className="hidden text-white/70 hover:text-[var(--gold)] sm:block"><Icon name="skip-forward" size={19} /></button><button type="button" onClick={(event) => { event.stopPropagation(); closePlayer(); }} aria-label="Close player" className="text-white/50 hover:text-white">×</button></div></section>}
    </main>
  );
}
