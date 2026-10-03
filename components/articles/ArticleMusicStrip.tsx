"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Track = { title: string; artist?: string; audioUrl?: string };
type MusicItem = { title: string; image: string; aliases: string[]; credit: string };

const items: MusicItem[] = [
  { title: "Before the Stadium Wakes", image: "/images/articles/article_music_pics/Before_the_stadium_wakes.png", aliases: ["before the stadium wakes"], credit: "Accoladi Symphonic Orchestra" },
  { title: "Stillness Between Heartbeats", image: "/images/articles/article_music_pics/atillness_between_heartbeats.png", aliases: ["stillness between heartbeats"], credit: "Accoladi String Quartet · Hyuk Kim Soprano Saxophone Soloist" },
  { title: "Breath Into the Blue", image: "/images/articles/article_music_pics/breather_into_the blue.png", aliases: ["breath into the blue", "breath into blue"], credit: "Accoladi Symphonic Orchestra with Wilkerson McAlister, Euphonium Soloist" },
  { title: "The Field Is Waiting", image: "/images/articles/article_music_pics/the_field_is_waiting.png", aliases: ["the field is waiting", "field is waiting"], credit: "Accoladi Symphonic Orchestra with Cromer Crain, Flugelhorn Soloist and Noy, Euphonium Soloist" },
];

const normalize = (value: string) => value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

function MusicCard({ item, track }: { item: MusicItem; track?: Track }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-[#fffdfa] shadow-sm">
      <div className="relative aspect-square bg-[var(--navy)]">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain" />
      </div>
      <div className="p-4">
        <p className="font-[family-name:var(--font-display)] text-xl leading-tight text-[var(--navy)]">{item.title}</p>
        <p className="mt-2 text-sm leading-5 text-[var(--slate)]">{item.credit}</p>
        <button type="button" onClick={toggle} disabled={!track?.audioUrl} aria-label={`${playing ? "Pause" : "Play"} ${item.title}`} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-3 py-3 text-sm font-bold text-[var(--navy)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--purple)] hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60">
          {playing ? <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-current"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10-6.8a1.1 1.1 0 0 0 0-1.8l-10-6.8C8.9 3.9 8 4.4 8 5.2Z" /></svg>}
          {playing ? "Pause song" : "Play song"}
        </button>
      </div>
      {track?.audioUrl && <audio ref={audioRef} src={track.audioUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />}
    </article>
  );
}

export function ArticleMusicStrip() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/radio/songs", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { songs?: Track[] } | null) => setTracks(payload?.songs || []))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return <section aria-label="Music from this article" className="my-10 grid grid-cols-2 gap-5">{items.map((item) => <MusicCard key={item.title} item={item} track={tracks.find((track) => item.aliases.includes(normalize(track.title)) && track.audioUrl)} />)}</section>;
}
