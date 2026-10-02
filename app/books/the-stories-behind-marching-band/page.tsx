"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { StoriesBehindContent, storiesBehindChapterTitles } from "@/components/books/stories-behind/StoriesBehindContent";

export default function StoriesBehindMarchingBandPage() {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const readerRef = useRef<HTMLElement>(null);
  const selectChapter = (chapter: number) => { setSelectedChapter(chapter); readerRef.current?.scrollTo({ top: 0, behavior: "smooth" }); };

  return <main className="min-h-screen bg-[#f7f4ee] pt-[76px] text-[#0a1023]"><SiteNav solid />
    <div className="grid md:h-[calc(100vh-76px)] md:overflow-hidden md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[310px_minmax(0,1fr)]">
      <aside className="relative z-20 max-h-[calc(100vh-76px)] overflow-y-auto border-r border-white/10 bg-[#091328] px-4 py-5 text-white md:h-full md:min-h-0 md:py-6 lg:px-7 lg:py-7">
        <div className="mx-auto max-w-[255px]">
          <div className="relative aspect-[.66] overflow-hidden rounded-xl border border-white/35 shadow-[0_18px_35px_rgba(0,0,0,.28)]"><Image src="/content/images/books/stories-behind-marchingbandv3.png" alt="The Stories Behind Marching Band book cover" fill sizes="255px" className="object-contain" /></div>
          <nav aria-label="Chapters" className="mt-5 space-y-1.5 lg:mt-7 lg:space-y-2">
            {storiesBehindChapterTitles.map((chapter, index) => <button type="button" key={chapter} onClick={() => selectChapter(index)} aria-current={selectedChapter === index ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-white/10 lg:gap-4 lg:py-3 ${selectedChapter === index ? "bg-[#f5c96a] font-medium text-[#1a1b22]" : "text-white/90"}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ring-1 ring-[var(--gold)]/35 lg:h-9 lg:w-9 ${selectedChapter === index ? "bg-[#091328]/15 text-[#091328]" : "bg-[var(--gold)]/15 text-[var(--gold)]"}`}>{index === 0 ? "P" : index}</span><span>{chapter}</span></button>)}
          </nav>
          <div className="mt-5 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.25em] text-white/40 lg:mt-6 lg:pt-6">A longer read for the ride</div>
        </div>
      </aside>
      <section ref={readerRef} className="relative min-w-0 overflow-hidden bg-[#f7f4ee] md:h-full md:overflow-y-auto">
        <div className="relative min-h-[360px] overflow-hidden border-b border-[#071126]/10 bg-[#f7f4ee] px-7 pb-12 pt-14 sm:min-h-[390px] sm:px-12 lg:min-h-[430px] lg:px-16 lg:pt-10"><Image src="/images/books/book-view/firstnote/hero-bg.png" alt="Sunset view from a bus window" fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover object-center opacity-90" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,.98)_0%,rgba(250,248,243,.92)_43%,rgba(250,248,243,.3)_67%,rgba(7,17,38,.1)_100%)]" /><div className="relative max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-[#2d3550]">History and tradition</p><h1 className="mt-5 text-5xl leading-[.88] sm:text-6xl lg:text-[5.2rem]">The Stories Behind<br />Marching Band</h1><div className="mt-5 h-0.5 w-14 bg-[var(--gold)]" /><p className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-2xl leading-tight sm:text-3xl">Every tradition has a story. Every rehearsal continues it.</p><p className="mt-5 max-w-xl text-base leading-7 sm:text-lg">A journey through more than 2,000 years of music, discipline, tradition, and the story behind American marching band.</p></div></div>
        <StoriesBehindContent selectedChapter={selectedChapter} onChapterChange={setSelectedChapter} />
      </section>
    </div>
  </main>;
}
