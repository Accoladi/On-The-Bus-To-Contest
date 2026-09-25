"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RadioSong = {
  title?: string;
  artist?: string;
  coverImageUrl?: string;
};

export function RadioSection() {
  const [song, setSong] = useState<RadioSong | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/radio/songs", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { songs?: RadioSong[] } | null) => setSong(payload?.songs?.[0] ?? null))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <section id="radio" className="scroll-mt-8 bg-[var(--purple)] px-6 py-20 text-[var(--cream)] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--champagne)]">Between the sets</p>
          <h2 className="mt-5 max-w-xl text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">Find your rhythm.</h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
            A soundtrack for the ride, the warm-up, and every moment when you need to reset before the next performance.
          </p>
          <Link href="/listen" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3 font-semibold text-[var(--navy)] transition hover:bg-[var(--champagne)]">
            Listen to the radio <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-white/20 bg-[var(--navy)] p-5 shadow-[0_24px_70px_rgba(7,26,47,0.3)] sm:p-7">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--gold)]/20 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center">
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl sm:w-52">
              <Image src={song?.coverImageUrl || "/content/images/radio-cover.jpg"} alt="Radio cover artwork" fill sizes="(max-width: 640px) 100vw, 208px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">Now playing</p>
              <h3 className="mt-3 truncate text-3xl">{song?.title || "The road is calling"}</h3>
              <p className="mt-2 truncate text-white/60">{song?.artist || "Your contest-day soundtrack"}</p>
              <div className="mt-8 flex h-12 items-end gap-1.5" aria-hidden="true">
                {[18, 30, 24, 42, 28, 36, 20, 46, 30, 38, 25, 44, 21, 33, 17, 40, 27, 35].map((height, index) => <span key={index} className="w-1.5 rounded-full bg-[var(--gold)]" style={{ height: `${height}px`, opacity: 0.5 + (index % 4) * 0.12 }} />)}
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4 text-xs uppercase tracking-[0.16em] text-white/50">
                <span>Radio preview</span>
                <span>Live catalog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
