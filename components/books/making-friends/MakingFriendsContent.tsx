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
  return <article data-book-page={safeIndex} id={page.id} className="max-w-4xl font-[Georgia,serif] text-[#35405b]">
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{safeIndex === 0 ? "A practical guide for the ride" : `Chapter ${safeIndex}`}</p>
    <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[.95] text-[#0a1023] sm:text-5xl">{page.title}</h2>
    <div className="mt-8">{page.paragraphs.map((paragraph, index) => <p key={`${page.id}-${index}`} className="mb-5 whitespace-pre-line text-[1.05rem] leading-8">{paragraph}</p>)}</div>
  </article>;
}

export const makingFriendsPageCount = 43;
export const makingFriendsChapters = buildPages().map((page) => ({ id: page.id, title: page.title }));
