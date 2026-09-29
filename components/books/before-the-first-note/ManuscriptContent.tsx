"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { beforeTheFirstNoteSections } from "@/content/books/beforeTheFirstNote";

export const texts = beforeTheFirstNoteSections.map((section) => section.text);
const poemTitles = new Set(["The Bus Is Moving", "You Do Not Have to Be Fearless", "Look Beside You", "The Person Who Looks Calm", "For the Freshman", "For the Senior", "The Quiet Student", "Thank the Bus Driver", "The Uniform", "Before the First Note", "One Count at a Time", "When the Warm-Up Is Bad", "The Director at the Front", "To the One Who Is Scared", "Play for Someone", "When They Say Your Name", "The Gate", "The Hands That Got You Here", "The Field Is Waiting", "If You Miss", "Your Best Is Not Perfect", "Another Band", "The Person in Row Forty", "Stadium Lights", "The Middle of the Show", "Listen Across the Band", "The Final Chord", "After the Last Note", "The Scoreboard", "If They Call Your Name", "If They Don't Call Your Name", "Whatever the Judge Says", "On the Ride Home", "Tomorrow's Rehearsal", "Leave Something on the Field", "We Were Here"]);
const partNames: Record<string, { id: string; subtitle: string }> = { "PART ONE": { id: "part-one", subtitle: "The Ride There" }, "PART TWO": { id: "part-two", subtitle: "Before You Perform" }, "PART THREE": { id: "part-three", subtitle: "On the Field" }, "PART FOUR": { id: "part-four", subtitle: "The Ride Home" } };
const endMarkers = new Set(["Take This With You", "FROM A BAND BUS", "THEY WERE IN BAND TOO", "PART ONE", "PART TWO", "PART THREE", "PART FOUR", "A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS", "About the Band Member Reflections", "About the Quotations"]);
const journalEnd = new Set(["A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS"]);

export function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function Paragraph({ children }: { children: ReactNode }) { return <p className="mb-5 whitespace-pre-line text-[1.05rem] leading-8 text-[#35405b]">{children}</p>; }
function PartHeader({ label, subtitle }: { label: string; subtitle: string }) { return <section id={partNames[label].id} className="scroll-mt-8 border-t border-[#14203d]/10 pt-8"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{label}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[.9] text-[#0a1023]">{subtitle}</h2></section>; }
function PoemPage({ title, lines, fontScale }: { title: string; lines: string[]; fontScale: number }) { return <article id={slugify(title)} className="my-3 scroll-mt-8" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Poem</p><h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[.95] text-[#0a1023] sm:text-5xl">{title}</h3><div className="mt-6 max-w-2xl">{lines.map((line, index) => { const isQuote = /^[\s]*(?:[“"]|Quote:)/.test(line); return isQuote ? <blockquote key={`${title}-${index}`} className="mb-6 border-l-4 border-[#e2b24f] bg-[#fff4d8] px-6 py-4 font-[family-name:var(--font-display)] text-xl italic leading-8 text-[#26304b]">{line}</blockquote> : <Paragraph key={`${title}-${index}`}>{line}</Paragraph>; })}</div></article>; }
const celebrityImages: Record<string, string> = {
  "Lizzo": "/images/books/book-view/firstnote/celebrity/lizzo.png",
  "Christopher Martin": "/images/books/book-view/firstnote/celebrity/Christopher Martin.png",
  "Dolly Parton": "/images/books/book-view/firstnote/celebrity/Dolly Parton.png",
  "Bill Clinton": "/images/books/book-view/firstnote/celebrity/Bill Clinton.png",
  "Vince Carter": "/images/books/book-view/firstnote/celebrity/Vince Carter.png",
  "Pharrell Williams": "/images/books/book-view/firstnote/celebrity/Pharrel Williams.png",
  "Eva Longoria": "/images/books/book-view/firstnote/celebrity/Eva Longoria.png",
  "Kesha": "/images/books/book-view/firstnote/celebrity/Kesha.png",
  "Anthony McGill": "/images/books/book-view/firstnote/celebrity/Anthony McGill.png",
};
const profileTrackAliases: Record<string, string[]> = {
  "Dolly Parton": ["dolly parton marched in her high school band", "dolly parton marched in her highschool band"],
  "Bill Clinton": ["the drum major in the white house"],
  "Anthony McGill": ["the ballad of anthony mcgill"],
};
type ProfileTrack = { title: string; artist?: string; audioUrl?: string; durationSeconds?: number };
function normalizeTrackTitle(value: string) { return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function ProfileMusicCard({ person }: { person: string }) {
  const [track, setTrack] = useState<ProfileTrack | null>(null); const [playing, setPlaying] = useState(false); const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => { const aliases = profileTrackAliases[person]; if (!aliases) return; const controller = new AbortController(); fetch("/api/radio/songs", { signal: controller.signal }).then((response) => response.ok ? response.json() : null).then((payload: { songs?: ProfileTrack[] } | null) => { const match = payload?.songs?.find((song) => aliases.includes(normalizeTrackTitle(song.title)) && song.audioUrl); if (match) setTrack(match); }).catch(() => undefined); return () => controller.abort(); }, [person]);
  if (!track) return null;
  const toggle = () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) audio.play().catch(() => setPlaying(false)); else audio.pause(); };
  return <div className="clear-both mt-8 flex items-center gap-4 rounded-2xl border border-[#d7cbe0] bg-white/80 px-4 py-3 shadow-sm"><audio ref={audioRef} src={track.audioUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} /><button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#80558d] text-white transition hover:bg-[#5a2a78]">{playing ? "Ⅱ" : "▶"}</button><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#80558d]">From the bus radio</p><p className="truncate font-[family-name:var(--font-display)] text-lg leading-tight text-[#0a1023]">{track.title}</p><p className="truncate text-xs text-[#536079]">{track.artist || "On the Bus to Contest"}</p></div></div>;
}
function ProfilePage({ title, lines, fontScale }: { title: string; lines: string[]; fontScale: number }) { const celebrity = Object.entries(celebrityImages).find(([name]) => title.startsWith(name))?.[1]; const person = Object.keys(profileTrackAliases).find((name) => title.startsWith(name)); return <section className="my-3 overflow-hidden rounded-[22px] border border-[#d7cbe0] bg-[#faf6fb]" style={{ fontSize: `${fontScale}em` }}><div className="border-b border-[#d7cbe0] bg-[#80558d] px-7 py-5 text-white sm:px-9"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5c96a]">They were in band too</p><h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight">{title}</h3></div><div className="p-7 sm:p-9">{celebrity && <div className="relative float-right mb-5 ml-7 h-56 w-56 overflow-hidden rounded-2xl border-2 border-[var(--gold)] shadow-md sm:h-72 sm:w-72"><Image src={celebrity} alt="" fill sizes="288px" className="object-cover" /></div>}{lines.map((line, index) => <Paragraph key={`${title}-${index}`}>{line}</Paragraph>)}<div className="clear-both" />{person && <ProfileMusicCard person={person} />}</div></section>; }
function JournalPage({ id, title, prompts, fontScale }: { id: string; title: string; prompts: string[]; fontScale: number }) { const storageKey = `before-the-first-note-${slugify(title)}`; const [answers, setAnswers] = useState<Record<string, string>>({}); useEffect(() => { try { setAnswers(JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch { setAnswers({}); } }, [storageKey]); function update(prompt: string, value: string) { const next = { ...answers, [prompt]: value }; setAnswers(next); localStorage.setItem(storageKey, JSON.stringify(next)); } return <section id={id} className="rounded-[22px] border border-[#e2b24f]/60 bg-[#fffdfa] p-7 shadow-[0_12px_35px_rgba(20,27,44,.08)] sm:p-10" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Reflection page</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-none">{title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#536079]">Take a quiet minute to write what you want to remember. Your answers stay on this device.</p><div className="mt-8 grid gap-5">{prompts.map((prompt) => <label key={prompt} className="grid gap-2 text-base font-semibold text-[#27304a]"><span>{prompt}</span><textarea value={answers[prompt] || ""} onChange={(event) => update(prompt, event.target.value)} rows={2} className="w-full resize-y rounded-xl border border-[#14203d]/15 bg-white px-4 py-3 font-sans text-base font-normal outline-none transition focus:border-[#e2b24f] focus:ring-2 focus:ring-[#e2b24f]/20" /></label>)}</div></section>; }

type BookPage = { blocks: ReactNode[]; chapter?: string };
type BookPages = { pages: BookPage[]; chapterPages: Record<string, number> };

function buildPages(fontScale: number): BookPages {
  const pages: BookPage[] = []; const chapterPages: Record<string, number> = {}; let blocks: ReactNode[] = []; let i = 0; let firstPart = true;
  const flush = () => { if (blocks.length) { pages.push({ blocks }); blocks = []; } };
  const add = (node: ReactNode, chapter?: string, forceNew = false) => { if (forceNew) flush(); if (chapter && chapterPages[chapter] === undefined) chapterPages[chapter] = pages.length; blocks.push(node); };
  while (i < texts.length) {
    const text = texts[i];
    if (partNames[text]) { const part = partNames[text]; add(<PartHeader key={text} label={text} subtitle={part.subtitle} />, part.id, true); i += 1; continue; }
    if (text === "THEY WERE IN BAND TOO") { const title = texts[i + 1] || "Band profile"; const body: string[] = []; let j = i + 2; if (texts[j]?.startsWith("[Black-and-white")) j += 1; while (j < texts.length && !endMarkers.has(texts[j]) && !poemTitles.has(texts[j]) && !partNames[texts[j]]) { body.push(texts[j]); j += 1; } add(<ProfilePage key={`profile-${i}`} title={title} lines={body} fontScale={fontScale} />); i = j; continue; }
    if (text === "FROM A BAND BUS") { add(<aside key={`bus-${i}`} className="rounded-r-[20px] border-l-4 border-[#e2b24f] bg-[#fff4d8] px-7 py-6 sm:px-9" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">From a band bus</p><p className="mt-4 font-[family-name:var(--font-display)] text-2xl italic leading-tight text-[#26304b]">“{texts[i + 1]}”</p></aside>); i += 2; continue; }
    if (text === "Take This With You") { add(<aside key={`takeaway-${i}`} className="rounded-[18px] border border-[#e2b24f]/60 bg-[#fffdfa] px-7 py-6 shadow-sm sm:px-9" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Take this with you</p><p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#0a1023]">{texts[i + 1]}</p></aside>); i += 2; continue; }
    if (text === "Before I Step Off This Bus" || (text === "On the Ride Home" && i > 900)) { const prompts: string[] = []; let j = i + 1; while (j < texts.length && !journalEnd.has(texts[j])) { if (texts[j].endsWith(":")) prompts.push(texts[j]); j += 1; } add(<JournalPage key={`journal-${i}`} id={text === "Before I Step Off This Bus" ? "reflections" : "ride-home-reflection"} title={text} prompts={prompts} fontScale={fontScale} />, text === "Before I Step Off This Bus" ? "reflections" : undefined, true); i = j; continue; }
    if (poemTitles.has(text)) {
      const lines: string[] = []; let j = i + 1;
      while (j < texts.length && !poemTitles.has(texts[j]) && !endMarkers.has(texts[j]) && !partNames[texts[j]] && texts[j] !== "Before I Step Off This Bus") { lines.push(texts[j]); j += 1; }
      const companions: ReactNode[] = [];
      while (j < texts.length && (texts[j] === "FROM A BAND BUS" || texts[j] === "Take This With You")) {
        if (texts[j] === "FROM A BAND BUS") { companions.push(<aside key={`bus-${j}`} className="mt-7 rounded-r-[20px] border-l-4 border-[#e2b24f] bg-[#fff4d8] px-7 py-6 sm:px-9" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">From a band bus</p><p className="mt-4 font-[family-name:var(--font-display)] text-2xl italic leading-tight text-[#26304b]">“{texts[j + 1]}”</p></aside>); }
        if (texts[j] === "Take This With You") { companions.push(<aside key={`takeaway-${j}`} className="mt-7 rounded-[18px] border border-[#e2b24f]/60 bg-[#fffdfa] px-7 py-6 shadow-sm sm:px-9" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Take this with you</p><p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#0a1023]">{texts[j + 1]}</p></aside>); }
        j += 2;
      }
      flush(); add(<div key={`poem-page-${i}`}><PoemPage title={text} lines={lines} fontScale={fontScale} />{companions}</div>, undefined, true); flush(); i = j; continue;
    }
    if (text === "Dedication" || text === "Preface" || text === "How to Use This Book") { const id = text === "Dedication" ? "introduction" : slugify(text); const next = text === "Dedication" ? 16 : text === "Preface" ? 82 : 99; add(<section key={`front-${i}`} id={id} className={`scroll-mt-8 ${firstPart ? "" : "border-t border-[#14203d]/10 pt-8"}`} style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{text}</p><div className="mt-6">{texts.slice(i + 1, next).map((line, index) => <Paragraph key={`${text}-${index}`}>{line}</Paragraph>)}</div></section>, "introduction"); i = next; firstPart = false; continue; }
    if (text === "A WORD TO THE DIRECTOR" || text === "A WORD TO THE PEOPLE IN THE STANDS") { const id = text === "A WORD TO THE DIRECTOR" ? "letters" : "stands"; const body: string[] = []; let j = i + 1; while (j < texts.length && !["A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS"].includes(texts[j])) { body.push(texts[j]); j += 1; } add(<section key={`letter-${i}`} id={id} className="border-t border-[#14203d]/10 pt-8" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Reflection for the community</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-none text-[#0a1023]">{text.replace("A WORD TO ", "").toLowerCase().replace(/(^| )\w/g, (letter) => letter.toUpperCase())}</h2><div className="mt-7 max-w-3xl">{body.map((line, index) => <Paragraph key={`letter-${i}-${index}`}>{line}</Paragraph>)}</div></section>, "letters", true); i = j; continue; }
    if (text === "PEOPLE BEHIND THE WORDS") { add(<section key="people-behind-words" id="people-behind-words" className="border-t border-[#14203d]/10 pt-8" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Reference profiles</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-none text-[#0a1023]">People Behind the Words</h2><div className="mt-6">{texts.slice(i + 1).map((line, index) => <Paragraph key={`people-${index}`}>{line}</Paragraph>)}</div></section>, "people-behind-words", true); break; }
    add(<Paragraph key={`paragraph-${i}`}>{text}</Paragraph>); i += 1;
  }
  flush(); return { pages, chapterPages };
}

export function ManuscriptContent({ fontScale, pageIndex, onPageCount, onChapterPages }: { fontScale: number; pageIndex: number; onPageCount: (count: number) => void; onChapterPages: (pages: Record<string, number>) => void }) {
  const book = useMemo(() => buildPages(fontScale), [fontScale]); const safeIndex = Math.max(0, Math.min(pageIndex, book.pages.length - 1));
  useEffect(() => { onPageCount(book.pages.length); onChapterPages(book.chapterPages); }, [book, onPageCount, onChapterPages]);
  const pageBackground = `/images/books/book-view/firstnote/page-bgs/${(safeIndex % 6) + 1}.png`;
  return <div data-book-page={safeIndex} className="relative w-full overflow-hidden rounded-[12px] bg-white bg-top bg-no-repeat px-6 py-8 font-[Georgia,serif] font-normal leading-[1.65] sm:px-10 sm:py-10 lg:px-14 lg:py-12" style={{ backgroundImage: `url(${pageBackground})`, backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,250,.96)_0%,rgba(255,253,250,.9)_45%,rgba(255,253,250,.48)_62%,rgba(255,253,250,.08)_78%,transparent_100%)]" />
    <div className="relative z-10">{book.pages[safeIndex]?.blocks}</div>
  </div>;
}
