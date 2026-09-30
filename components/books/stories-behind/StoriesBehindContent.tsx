"use client";

import { useEffect, useState } from "react";

type Chapter = { title: string; pages: string[] };

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

export function StoriesBehindContent() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => { fetch("/content/documents/the-stories-behind-marching-band.html").then((response) => response.text()).then((html) => setChapters(buildChapters(html))).catch(() => undefined); }, []);
  const pages = chapters.flatMap((chapter, chapterIndex) => chapter.pages.map((html) => ({ html, chapterIndex, title: chapter.title })));
  const current = pages[page];
  const chapterStart = (index: number) => setPage(pages.findIndex((item) => item.chapterIndex === index));
  if (!current) return <p className="p-8 text-[var(--slate)]">Loading the book…</p>;
  return <div>
    <div className="flex items-center justify-between gap-4 bg-white px-7 py-7 sm:px-12"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#27304a]">The Stories Behind Marching Band</p><div className="mt-3 h-0.5 w-14 bg-[var(--gold)]" /></div><div className="flex items-center gap-3"><span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-[#6c7180] sm:inline">Page {page + 1} / {pages.length}</span><button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => setPage(page - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl disabled:opacity-35">‹</button><button type="button" aria-label="Next page" disabled={page === pages.length - 1} onClick={() => setPage(page + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl disabled:opacity-35">›</button></div></div>
    <div className="p-5 sm:p-10"><article className="mx-auto min-h-[520px] max-w-3xl rounded-xl bg-[#fffdfa] px-7 py-9 shadow-[0_10px_30px_rgba(20,27,44,.08)] sm:px-12 sm:py-12"><div className="[&_h2]:mb-7 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-3xl [&_h2]:leading-tight [&_p]:mb-5 [&_p]:text-[1.05rem] [&_p]:leading-8 [&_p]:text-[#35465a]" dangerouslySetInnerHTML={{ __html: current.html }} /></article></div>
    <div className="flex flex-wrap gap-2 border-t border-[#14203d]/10 px-5 py-5 sm:px-10">{chapters.map((chapter, index) => <button type="button" key={chapter.title} onClick={() => chapterStart(index)} className={`rounded-full px-3 py-2 text-xs font-semibold ${current.chapterIndex === index ? "bg-[var(--gold)] text-[var(--navy)]" : "bg-[#edf1f5] text-[var(--navy)]"}`}>{chapter.title}</button>)}</div>
  </div>;
}
