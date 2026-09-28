"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const chapters = [
  "Introduction",
  "The Ride There",
  "Nerves and Confidence",
  "Your People",
  "Mistakes and Recoveries",
  "Winning and Losing",
  "The Bigger Picture",
  "Lessons for Life",
];

const dedicationLines = [
  "For the ones on the bus.",
  "For the student performing for the first time.",
  "For the senior performing for one of the last times.",
  "For the person who cannot stop talking because they are nervous.",
  "For the person who has not said a word.",
  "For the director at the front trying to keep a hundred details moving in the same direction.",
  "And for every band member who has ever looked through a bus window toward a contest and quietly wondered:",
];

function BookMarkIcon() {
  return <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M6 4.75A2.75 2.75 0 0 1 8.75 2h6.5A2.75 2.75 0 0 1 18 4.75V21l-6-3.6L6 21V4.75Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
}

function OpenBookIcon() {
  return <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 32 32" fill="none"><path d="M4.5 7.5c4.7-.6 8.3.5 11.5 3.2v16.8c-3.2-2.7-6.8-3.8-11.5-3.2V7.5Zm23 0c-4.7-.6-8.3.5-11.5 3.2v16.8c3.2-2.7 6.8-3.8 11.5-3.2V7.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M16 10.7v16.8" stroke="#071a2f" strokeWidth="1.2" /></svg>;
}

function HomeIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="m3 11.4 9-7.2 9 7.2v8.1a1.5 1.5 0 0 1-1.5 1.5h-5.1v-6.2h-4.8V21H4.5A1.5 1.5 0 0 1 3 19.5v-8.1Z" /></svg>;
}

export default function BeforeTheFirstNotePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fontScale, setFontScale] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);

  function goToPage(page: number) {
    const nextPage = Math.max(1, Math.min(chapters.length, page));
    setCurrentPage(nextPage);
    document.getElementById(nextPage === 1 ? "introduction" : `chapter-${nextPage - 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#0a1023]">
      <header className="sticky top-0 z-30 flex min-h-[72px] items-center gap-7 border-b border-white/10 bg-[#071126] px-5 py-3 text-white sm:px-8 lg:gap-12 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center text-[var(--gold)]"><OpenBookIcon /></span>
          <span className="font-[family-name:var(--font-display)] text-xl leading-none sm:text-2xl">On the Bus to Contest</span>
        </Link>
        <nav aria-label="Book navigation" className="hidden items-center gap-8 text-sm lg:flex">
          {[
            ["Home", "/"], ["Games", "/play"], ["Coloring", "/activities/coloring"], ["Books", "/books"], ["Articles", "/read"],
          ].map(([label, href]) => <Link key={label} href={href} className={`relative py-5 transition hover:text-[var(--gold)] ${label === "Books" ? "text-white after:absolute after:bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--gold)]" : "text-white/90"}`}>{label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <label className="hidden h-10 w-56 items-center gap-3 rounded-full border border-white/25 px-4 text-sm text-white/60 xl:flex"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg><input aria-label="Search in this book" placeholder="Search in this book..." className="w-full bg-transparent outline-none placeholder:text-white/60" /></label>
          <button type="button" aria-label="Bookmark book" aria-pressed={bookmarked} onClick={() => setBookmarked((value) => !value)} className={`transition hover:text-[var(--gold)] ${bookmarked ? "text-[var(--gold)]" : "text-white/90"}`}><BookMarkIcon /></button>
        </div>
      </header>

      <div className="grid md:h-[calc(100vh-72px)] md:overflow-hidden md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="relative z-20 border-r border-white/10 bg-[#091328] px-4 py-7 text-white md:h-full md:overflow-hidden lg:px-7">
          <div className="mx-auto max-w-[255px]">
            <div className="relative aspect-[.66] overflow-hidden rounded-xl border border-white/35 shadow-[0_18px_35px_rgba(0,0,0,.28)]"><Image src="/images/books/book-view/firstnote/book-cover.png" alt="Before the First Note book cover" fill sizes="255px" className="object-cover" /></div>
            <nav aria-label="Chapters" className="mt-7 space-y-2">
              {chapters.map((chapter, index) => <button type="button" key={chapter} onClick={() => goToPage(index + 1)} aria-current={currentPage === index + 1 ? "page" : undefined} className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left text-sm transition hover:bg-white/10 ${currentPage === index + 1 ? "bg-[#f5c96a] font-medium text-[#1a1b22]" : "text-white/90"}`}>{index === 0 ? <HomeIcon /> : <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-base font-medium">{index}</span>}<span>{chapter}</span></button>)}
            </nav>
            <div className="mt-6 border-t border-white/20 pt-6 text-xs uppercase tracking-[0.25em] text-white/40">A student guide for the ride</div>
          </div>
        </aside>

        <section className="relative min-w-0 overflow-hidden bg-[#f7f4ee] md:h-full md:overflow-y-auto">
          <div className="relative min-h-[360px] overflow-hidden border-b border-[#071126]/10 bg-[#f7f4ee] px-7 pb-12 pt-14 sm:min-h-[390px] sm:px-12 lg:min-h-[430px] lg:px-16 lg:pt-10">
            <Image src="/images/books/book-view/firstnote/hero-bg.png" alt="Sunset view from a bus window" fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover object-center opacity-90" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,.98)_0%,rgba(250,248,243,.92)_43%,rgba(250,248,243,.3)_67%,rgba(7,17,38,.1)_100%)]" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#2d3550]">Student guide</p>
              <h1 className="mt-5 text-5xl leading-[.88] sm:text-6xl lg:text-[5.2rem]">Before the<br />First Note</h1>
              <p className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-none sm:text-3xl">Poems for the Ride to Contest</p>
              <div className="mt-5 h-0.5 w-14 bg-[var(--gold)]" />
              <p className="mt-5 text-base leading-7 sm:text-lg">For marching band members on the way to the field</p>
            </div>
            <p className="absolute right-8 top-20 hidden max-w-[190px] rotate-[-8deg] font-[family-name:var(--font-display)] text-3xl italic leading-tight text-white/90 lg:block">The ride<br />to the contest<br />is part of<br />the experience.</p>
          </div>

          <div className="relative z-10 mx-5 -mt-1 rounded-[18px] bg-[#fffdfa] px-7 py-7 shadow-[0_18px_45px_rgba(20,27,44,.1)] sm:mx-10 sm:px-12 sm:py-9 lg:mx-12 lg:px-12 lg:py-10 xl:mx-14">
              <div className="flex items-center justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#27304a]">Dedication</p><div className="mt-3 h-0.5 w-14 bg-[var(--gold)]" /></div>
              <div className="flex items-center gap-3 text-[#26304b]"><button type="button" aria-label="Change reading size" onClick={() => setFontScale((value) => value >= 1.2 ? 1 : value + 0.1)} className="font-[family-name:var(--font-display)] text-xl transition hover:text-[var(--gold)]">Aa</button><button type="button" aria-label="Bookmark chapter" aria-pressed={bookmarked} onClick={() => setBookmarked((value) => !value)} className={`transition hover:text-[var(--gold)] ${bookmarked ? "text-[var(--gold)]" : ""}`}><BookMarkIcon /></button><span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-[#6c7180] sm:inline">Page {String(currentPage).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span><button type="button" aria-label="Previous chapter" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35">‹</button><button type="button" aria-label="Next chapter" disabled={currentPage === chapters.length} onClick={() => goToPage(currentPage + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14203d]/10 text-2xl transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35">›</button></div>
              </div>
            <article id="introduction" style={{ fontSize: `${fontScale}em` }} className="mt-6 max-w-4xl scroll-mt-8 font-[Georgia,serif] font-normal leading-[1.65]">
              {dedicationLines.map((line) => <p key={line}>{line}</p>)}
              <div className="my-5 rounded-r-xl border-l-4 border-[var(--gold)] bg-[#faf1fa] px-6 py-5 text-3xl italic text-[#14172b] sm:px-8 sm:text-4xl"><span className="mr-4 text-5xl text-[#80558d]">“</span>Am I ready?</div>
              <p>You probably are.</p>
            </article>
            <div className="mt-10 flex items-center justify-center gap-4 text-[var(--gold)]"><span className="h-px w-1/3 bg-[var(--gold)]" /><span aria-hidden="true" className="text-xl">♬</span><span className="h-px w-1/3 bg-[var(--gold)]" /></div>
          </div>

          <div className="mx-5 mt-10 space-y-10 pb-20 sm:mx-10 lg:mx-12 xl:mx-14">
            {chapters.slice(1).map((chapter, index) => <article key={chapter} id={`chapter-${index + 1}`} style={{ fontSize: `${fontScale}em` }} className="scroll-mt-8 rounded-[18px] bg-[#fffdfa] px-7 py-8 font-[Georgia,serif] font-normal shadow-[0_10px_30px_rgba(20,27,44,.06)] sm:px-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#27304a]">Chapter 0{index + 1}</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-none">{chapter}</h2><p className="mt-5 max-w-3xl text-xl leading-8 text-[#35405b]">This chapter is a placeholder for the book’s full text. It will hold the reflections, poems, and stories for the ride, presented one chapter at a time in this calm reading space.</p></article>)}
          </div>
        </section>
      </div>
    </main>
  );
}
