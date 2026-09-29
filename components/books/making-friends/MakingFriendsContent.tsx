"use client";

import { useEffect, useMemo } from "react";
import { makingFriendsSections } from "@/content/books/makingFriends";

const texts = makingFriendsSections.map((section) => section.text);
const chapterPattern = /^CHAPTER\s+(\d+)$/i;

type BookPage = { id: string; title: string; paragraphs: string[] };

function buildPages() {
  const pages: BookPage[] = [];
  let current: BookPage = { id: "introduction", title: "On the Band Bus", paragraphs: [] };
  for (const text of texts) {
    const match = text.match(chapterPattern);
    if (match) {
      pages.push(current);
      current = { id: `chapter-${match[1]}`, title: "", paragraphs: [] };
      continue;
    }
    if (!current.title) { current.title = text; continue; }
    current.paragraphs.push(text);
  }
  pages.push(current);
  return pages;
}

export function MakingFriendsContent({ pageIndex, onPageCount, onChapterPages }: { pageIndex: number; onPageCount: (count: number) => void; onChapterPages: (pages: Record<string, number>) => void }) {
  const pages = useMemo(buildPages, []);
  const safeIndex = Math.max(0, Math.min(pageIndex, pages.length - 1));
  useEffect(() => { onPageCount(pages.length); onChapterPages(Object.fromEntries(pages.map((page, index) => [page.id, index]))); }, [pages, onPageCount, onChapterPages]);
  const page = pages[safeIndex];
  const pageBackground = `/images/books/book-view/makefriends/page-bgs/${(safeIndex % 3) + 1}.png`;
  return <article data-book-page={safeIndex} id={page.id} className="relative max-w-none overflow-hidden rounded-b-[18px] bg-[#fffdfa] bg-top bg-no-repeat px-7 py-8 font-[Georgia,serif] text-[#35405b] sm:px-10 sm:py-10 lg:px-14 lg:py-12" style={{ backgroundImage: `url(${pageBackground})`, backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,250,.96)_0%,rgba(255,253,250,.9)_45%,rgba(255,253,250,.55)_62%,rgba(255,253,250,.18)_80%,rgba(255,253,250,.06)_100%)]" />
    <div className="relative z-10">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{safeIndex === 0 ? "A practical guide for the ride" : `Chapter ${safeIndex}`}</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[.95] text-[#0a1023] sm:text-5xl">{page.title}</h2>
      <div className="mt-8">{page.paragraphs.map((paragraph, index) => <p key={`${page.id}-${index}`} className="mb-5 whitespace-pre-line text-[1.05rem] leading-8">{paragraph}</p>)}</div>
    </div>
  </article>;
}

export const makingFriendsPageCount = 43;
export const makingFriendsChapters = buildPages().map((page) => ({ id: page.id, title: page.title }));
