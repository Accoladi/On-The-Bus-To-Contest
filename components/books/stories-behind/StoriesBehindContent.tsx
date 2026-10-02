"use client";

import { useEffect, useState } from "react";

type Chapter = { title: string; pages: string[] };

export const storiesBehindChapterTitles = [
  "Preface",
  "Chapter 1: Every August...",
  "Chapter 2: When Music Became a Weapon",
  "Chapter 3: The Sound of Freedom",
  "Chapter 4: A New Nation Finds Its Sound",
  "Chapter 5: America's Greatest Musical Gift",
  "Chapter 6: When an Instrument Changed a Life",
  "Chapter 7: When Football Gave Bands Their Biggest Stage",
  "Chapter 8: When America Fell in Love with Bands",
  "Chapter 9: When America Discovered the High School Marching Band",
  "Chapter 10: When America Saw the Future",
  "Chapter 11: When Excellence Became a National Movement",
  "Chapter 12: The Best Bands Wanted One More Stage",
  "Chapter 13: Now It's Your Turn",
];

const PAGE_SIZE = 10;

function buildChapters(source: string): Chapter[] {
  const document = new DOMParser().parseFromString(source, "text/html");
  return Array.from(document.querySelectorAll("section")).map((section) => {
    const elements = Array.from(section.children);
    const title = section.getAttribute("data-title") || elements[0]?.textContent || "Chapter";
    const heading = elements.shift()?.outerHTML || `<h2>${title}</h2>`;
    const pages: string[] = [];
    for (let index = 0; index < elements.length; index += PAGE_SIZE) pages.push(`${heading}${elements.slice(index, index + PAGE_SIZE).map((element) => element.outerHTML).join("")}`);
    return { title, pages: pages.length ? pages : [heading] };
  });
}

export function StoriesBehindContent({ selectedChapter = 0, onChapterChange }: { selectedChapter?: number; onChapterChange?: (chapter: number) => void }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => { fetch("/content/documents/the-stories-behind-marching-band.html").then((response) => response.text()).then((html) => setChapters(buildChapters(html))).catch(() => undefined); }, []);
  const pages = chapters.flatMap((chapter, chapterIndex) => chapter.pages.map((html) => ({ html, chapterIndex, title: chapter.title })));
  const requestedPage = pages.findIndex((item) => item.chapterIndex === selectedChapter);
  const activePage = requestedPage >= 0 && pages[page]?.chapterIndex !== selectedChapter ? requestedPage : page;
  const current = pages[activePage];
  const goToPage = (nextPage: number) => { const safePage = Math.max(0, Math.min(pages.length - 1, nextPage)); setPage(safePage); const nextChapter = pages[safePage]?.chapterIndex; if (nextChapter !== undefined) onChapterChange?.(nextChapter); };
  if (!current) return <p className="p-8 text-[var(--slate)]">Loading the book…</p>;
  return <div>
    <div className="flex items-center justify-between gap-4 bg-white px-7 py-7 sm:px-12 sm:py-9 lg:px-12 lg:py-10"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#27304a]">The Stories Behind Marching Band</p><div className="mt-3 h-0.5 w-14 bg-[var(--gold)]" /></div><div className="flex items-center gap-3 text-[#26304b]"><span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-[#6c7180] sm:inline">Page {String(activePage + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span><button type="button" aria-label="Previous page" disabled={activePage === 0} onClick={() => goToPage(activePage - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35">‹</button><button type="button" aria-label="Next page" disabled={activePage === pages.length - 1} onClick={() => goToPage(activePage + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35">›</button></div></div>
    <div className="bg-[#f7f4ee] px-5 py-8 sm:px-10 sm:py-10 lg:px-12"><article className="mx-auto min-h-[560px] max-w-4xl overflow-hidden rounded-[18px] border border-[#d9c7aa] bg-[#f7f1e8] shadow-[0_16px_40px_rgba(20,27,44,.1)]"><div className="h-2 bg-[#17233a]" /><div className="px-7 py-9 sm:px-12 sm:py-12 lg:px-16 lg:py-14"><div className="[&_h2]:mb-8 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-4xl [&_h2]:leading-tight [&_h2]:text-[#17233a] [&_p]:mb-5 [&_p]:text-[1.05rem] [&_p]:leading-8 [&_p]:text-[#35465a]" dangerouslySetInnerHTML={{ __html: current.html }} /></div></article>
      <div className="mx-auto max-w-4xl border-t border-[#14203d]/10 px-1 pb-8 pt-8 sm:mt-8 sm:pb-12 sm:pt-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#80558d]">{activePage >= pages.length - 1 ? "End of the book" : "Turn the page"}</p><p className="mt-2 text-sm text-[#6c7180]">{activePage >= pages.length - 1 ? "You have reached the end of this book." : "Keep reading when you are ready."}</p></div>
          <div className="flex items-center gap-3"><button type="button" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0} className="rounded-full border border-[#14203d]/15 px-5 py-3 text-sm font-semibold text-[#26304b] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35">← Previous page</button><button type="button" onClick={() => goToPage(activePage + 1)} disabled={activePage >= pages.length - 1} className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[#1a1b22] transition hover:bg-[var(--soft-champagne)] disabled:cursor-not-allowed disabled:opacity-35">Next page →</button></div>
        </div>
      </div>
    </div>
  </div>;
}
