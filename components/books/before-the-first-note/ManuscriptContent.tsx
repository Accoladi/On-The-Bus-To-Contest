"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { beforeTheFirstNoteSections } from "@/content/books/beforeTheFirstNote";
import { FormattedLyrics } from "@/components/radio/RadioExtras";
import type { RadioSong } from "@/components/radio/types";

export const texts = beforeTheFirstNoteSections.map((section) => section.text);
const poemTitles = new Set(["The Bus Is Moving", "You Do Not Have to Be Fearless", "Look Beside You", "The Person Who Looks Calm", "For the Freshman", "For the Senior", "The Quiet Student", "Thank the Bus Driver", "The Uniform", "Before the First Note", "One Count at a Time", "When the Warm-Up Is Bad", "The Director at the Front", "To the One Who Is Scared", "Play for Someone", "When They Say Your Name", "The Gate", "The Hands That Got You Here", "The Field Is Waiting", "If You Miss", "Your Best Is Not Perfect", "Another Band", "The Person in Row Forty", "Stadium Lights", "The Middle of the Show", "Listen Across the Band", "The Final Chord", "After the Last Note", "The Scoreboard", "If They Call Your Name", "If They Don't Call Your Name", "Whatever the Judge Says", "On the Ride Home", "Tomorrow's Rehearsal", "Leave Something on the Field", "We Were Here", "When the Bus Pulls In", "Good Night, Band", "From the Bus to the Car", "The Uniform Comes Off", "When the House Is Quiet", "Tomorrow It Becomes a Memory", "Before the Next First Note"]);
const partNames: Record<string, { id: string; subtitle: string }> = { "PART ONE": { id: "part-one", subtitle: "The Ride There" }, "PART TWO": { id: "part-two", subtitle: "Before You Perform" }, "PART THREE": { id: "part-three", subtitle: "On the Field" }, "PART FOUR": { id: "part-four", subtitle: "The Ride Home" }, "PART FIVE": { id: "part-five", subtitle: "When the Bus Comes Home" } };
const endMarkers = new Set(["Take This With You", "FROM A BAND BUS", "THEY WERE IN BAND TOO", "PART ONE", "PART TWO", "PART THREE", "PART FOUR", "PART FIVE", "A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS", "About the Band Member Reflections", "About the Quotations"]);
const journalEnd = new Set(["A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS"]);

export function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function Paragraph({ children }: { children: ReactNode }) { return <p className="mb-5 whitespace-pre-line text-[1.05rem] leading-8 text-[#35405b]">{children}</p>; }
function PartHeader({ label, subtitle }: { label: string; subtitle: string }) { return <section id={partNames[label].id} className="scroll-mt-8 border-t border-[#14203d]/10 pt-8"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{label}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[.9] text-[#0a1023]">{subtitle}</h2></section>; }
function QuoteCard({ children, label = "Take this with you", className = "" }: { children: ReactNode; label?: string; className?: string }) { return <aside className={`mt-7 rounded-[18px] border border-[#e2b24f]/60 bg-[#fffdfa] px-7 py-6 shadow-sm sm:px-9 ${className}`}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{label}</p><div className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#0a1023]">{children}</div></aside>; }
function PoemPage({ title, lines, fontScale }: { title: string; lines: string[]; fontScale: number }) { return <article id={slugify(title)} className="mt-10 scroll-mt-8 sm:mt-12" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Poem</p><h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[.95] text-[#0a1023] sm:text-5xl">{title}</h3><div className="mt-6 max-w-2xl">{lines.map((line, index) => { const isQuote = /^[\s]*(?:[“"]|Quote:)/.test(line) || line.startsWith("Yo-Yo Ma says"); return isQuote ? <QuoteCard key={`${title}-${index}`}>{line}</QuoteCard> : <Paragraph key={`${title}-${index}`}>{line}</Paragraph>; })}</div></article>; }
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
  "Christopher Martin": [],
  "Dolly Parton": ["dolly parton marched in her high school band", "dolly parton marched in her highschool band"],
  "Bill Clinton": ["the drum major in the white house"],
  "Anthony McGill": ["the ballad of anthony mcgill"],
};
const sousaTrackAliases = ["how to play a sousa march", "stars and stripes forever"];
type ProfileTrack = Pick<RadioSong, "id" | "slug" | "title" | "artist" | "audioUrl" | "durationSeconds" | "coverImageUrl" | "lyrics" | "promo">;
function normalizeTrackTitle(value: string) { return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function ProfileMusicCard({ person }: { person: string }) {
  const [track, setTrack] = useState<ProfileTrack | null>(null); const [playing, setPlaying] = useState(false); const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => { const aliases = profileTrackAliases[person]; if (!aliases) return; const controller = new AbortController(); fetch("/api/radio/songs", { signal: controller.signal }).then((response) => response.ok ? response.json() : null).then((payload: { songs?: ProfileTrack[] } | null) => { const match = payload?.songs?.find((song) => aliases.includes(normalizeTrackTitle(song.title)) && song.audioUrl); if (match) setTrack(match); }).catch(() => undefined); return () => controller.abort(); }, [person]);
  if (!track) return null;
  const toggle = () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) audio.play().catch(() => setPlaying(false)); else audio.pause(); };
  return <div className="clear-both mt-8 flex items-center gap-4 rounded-2xl border border-[#d9c7aa] bg-[#efe5d8] px-4 py-3 shadow-sm"><audio ref={audioRef} src={track.audioUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} /><button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d3a43b] text-[#17233a] transition hover:bg-[#b98d2f]">{playing ? "Ⅱ" : "▶"}</button><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8e6a38]">From the bus radio</p><p className="truncate font-[family-name:var(--font-display)] text-lg leading-tight text-[#17233a]">{track.title}</p><p className="truncate text-xs text-[#536079]">{track.artist || "On the Bus to Contest"}</p></div></div>;
}
function ChristopherMartinVideo() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="clear-both mt-8 overflow-hidden rounded-2xl border border-[#14203d]/15 bg-[#17233a] text-white shadow-md">
      <button type="button" onClick={() => setOpen(true)} className="group relative block min-h-40 w-full overflow-hidden text-left sm:min-h-48">
        <Image src="/images/books/book-view/firstnote/celebrity/Christopher Martin.png" alt="Christopher Martin performing" fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover object-center opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,47,.9),rgba(7,26,47,.35))]" />
        <div className="relative flex min-h-40 items-center gap-4 px-6 py-6 sm:min-h-48 sm:px-8"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e2b24f] text-xl text-[#17233a] shadow-lg transition group-hover:scale-105">▶</span><span><span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#e2b24f]">Watch Christopher Martin</span><span className="mt-2 block font-[family-name:var(--font-display)] text-2xl leading-tight sm:text-3xl">From the band world to the New York Philharmonic</span></span></div>
      </button>
    </div>
    {open && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(7,26,47,.78)] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Christopher Martin video" onClick={() => setOpen(false)}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#071a2f] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close video" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-[#e2b24f] hover:text-[#17233a]">×</button>
        <div className="aspect-video"><iframe className="h-full w-full" src="https://www.youtube.com/embed/-U7pf7_huzA?start=57" title="Christopher Martin video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
      </div>
    </div>}
  </>;
}
function BookMusicCard({ aliases }: { aliases: string[] }) {
  const [track, setTrack] = useState<ProfileTrack | null>(null); const [playing, setPlaying] = useState(false); const [open, setOpen] = useState(false); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => { const controller = new AbortController(); fetch("/api/radio/songs", { signal: controller.signal }).then((response) => response.ok ? response.json() : null).then((payload: { songs?: ProfileTrack[] } | null) => { const match = payload?.songs?.find((song) => aliases.includes(normalizeTrackTitle(song.title)) && song.audioUrl); if (match) setTrack(match); }).catch(() => undefined); return () => controller.abort(); }, [aliases]);
  useEffect(() => { if (!open) return; const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = previousOverflow; }; }, [open]);
  if (!track) return null;
  const toggle = () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) audio.play().catch(() => setPlaying(false)); else audio.pause(); };
  return <>
    <div className="clear-both mt-7 flex items-center gap-3 rounded-2xl border border-[#d9c7aa] bg-[#efe5d8] px-4 py-3 shadow-sm">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setCurrentTime(0); }} />
      <div className="flex items-center gap-3 px-4 py-3"><button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d3a43b] text-sm text-[#17233a] transition hover:bg-[#b98d2f]">{playing ? "Ⅱ" : "▶"}</button><button type="button" onClick={() => setOpen(true)} className="min-w-0 text-left"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8e6a38]">From the bus radio</p><p className="truncate font-[family-name:var(--font-display)] text-base leading-tight text-[#17233a]">{track.title}</p><p className="truncate text-xs text-[#536079]">{track.artist || "John Philip Sousa"}</p><span className="mt-1 inline-block text-[11px] font-bold text-[#80558d] underline underline-offset-2">Open lyrics &amp; details</span></button></div>
    </div>
    {open && <div role="dialog" aria-modal="true" aria-label={track.title} className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[rgba(7,26,47,.72)] px-4 pb-6 pt-24 sm:px-6" onClick={() => setOpen(false)}>
      <div className="my-auto grid h-[min(720px,calc(100dvh-7rem))] max-h-[calc(100dvh-7rem)] w-[min(92vw,900px)] min-h-0 overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onClick={(event) => event.stopPropagation()}>
        <div className="min-h-0 overflow-y-auto overscroll-contain bg-[#fffdfa] p-5 sm:p-8"><div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--navy)]">{track.coverImageUrl && <Image src={track.coverImageUrl} alt={`${track.title} cover`} fill sizes="(max-width: 768px) 100vw, 460px" className="object-contain" />}</div><h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight">{track.title}</h2><p className="mt-2 text-sm text-[var(--slate)]">{track.artist || "Contest day radio"}</p>{track.audioUrl && <div className="mt-6 rounded-2xl border border-[var(--navy)]/10 bg-[#f1f4f7] p-4"><div className="flex items-center gap-3"><button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-sm transition hover:scale-105 hover:bg-[var(--soft-champagne)]">{playing ? "Ⅱ" : "▶"}</button><div className="min-w-0 flex-1"><input aria-label="Song progress" type="range" min="0" max={duration || track.durationSeconds || 1} step="0.1" value={Math.min(currentTime, duration || track.durationSeconds || 1)} onChange={(event) => { const nextTime = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = nextTime; setCurrentTime(nextTime); }} className="h-1.5 w-full cursor-pointer accent-[var(--purple)]" /><div className="mt-1 flex justify-between text-[11px] font-semibold tabular-nums text-[var(--slate)]"><span>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, "0")}`}</span><span>{`${Math.floor((duration || track.durationSeconds || 0) / 60)}:${Math.floor((duration || track.durationSeconds || 0) % 60).toString().padStart(2, "0")}`}</span></div></div></div></div>}</div>
        <div className="min-h-0 overflow-y-auto overscroll-contain border-t border-[var(--navy)]/10 bg-[#f7f9fb] p-5 sm:p-8 md:border-l md:border-t-0"><div className="flex items-center justify-between gap-4"><h3 className="font-[family-name:var(--font-display)] text-2xl">Lyrics</h3><button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1 text-2xl leading-none text-[var(--slate)] hover:bg-[#f7f3ea]" aria-label="Close song">×</button></div><FormattedLyrics lyrics={track.lyrics} /></div></div>
    </div>}
  </>;
}
function ProfilePage({ title, lines, fontScale }: { title: string; lines: string[]; fontScale: number }) { const celebrity = Object.entries(celebrityImages).find(([name]) => title.startsWith(name))?.[1]; const person = Object.keys(profileTrackAliases).find((name) => title.startsWith(name)); return <section className="my-3 overflow-hidden rounded-[22px] border border-[#d9c7aa] bg-[#f7f1e8]" style={{ fontSize: `${fontScale}em` }}><div className="border-b border-[#d3a43b]/70 bg-[#17233a] px-7 py-5 text-[#f7f1e8] sm:px-9"><div className="flex items-center gap-4"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d3a43b]">They were in band too</p><span className="h-px w-12 bg-[#d3a43b]" aria-hidden="true" /></div><h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight">{title}</h3></div><div className="p-7 sm:p-9">{celebrity && <div className="relative float-right mb-6 ml-8 h-60 w-60 overflow-hidden rounded-2xl border-2 border-[#d3a43b] shadow-md sm:h-80 sm:w-80"><Image src={celebrity} alt="" fill sizes="320px" className="object-cover" /></div>}{lines.map((line, index) => <p key={`${title}-${index}`} className="mb-5 whitespace-pre-line text-[1.05rem] leading-8 text-[#17233a]">{line}</p>)}<div className="clear-both" />{person === "Christopher Martin" && <ChristopherMartinVideo />}{person && <ProfileMusicCard person={person} />}</div></section>; }
function JournalPage({ id, title, prompts, fontScale }: { id: string; title: string; prompts: string[]; fontScale: number }) { const storageKey = `before-the-first-note-${slugify(title)}`; const [answers, setAnswers] = useState<Record<string, string>>({}); useEffect(() => { try { setAnswers(JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch { setAnswers({}); } }, [storageKey]); function update(prompt: string, value: string) { const next = { ...answers, [prompt]: value }; setAnswers(next); localStorage.setItem(storageKey, JSON.stringify(next)); } return <section id={id} className="rounded-[22px] border border-[#e2b24f]/60 bg-[#fffdfa] p-7 shadow-[0_12px_35px_rgba(20,27,44,.08)] sm:p-10" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Reflection page</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-none">{title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#536079]">Take a quiet minute to write what you want to remember. Your answers stay on this device.</p><div className="mt-8 grid gap-5">{prompts.map((prompt) => <label key={prompt} className="grid gap-2 text-base font-semibold text-[#27304a]"><span>{prompt}</span><textarea value={answers[prompt] || ""} onChange={(event) => update(prompt, event.target.value)} rows={2} className="w-full resize-y rounded-xl border border-[#14203d]/15 bg-white px-4 py-3 font-sans text-base font-normal outline-none transition focus:border-[#e2b24f] focus:ring-2 focus:ring-[#e2b24f]/20" /></label>)}</div></section>; }

type BookPage = { blocks: ReactNode[]; chapter?: string; background?: string };
type BookPages = { pages: BookPage[]; chapterPages: Record<string, number> };

function buildPages(fontScale: number): BookPages {
  const pages: BookPage[] = []; const chapterPages: Record<string, number> = {}; let blocks: ReactNode[] = []; let i = 0; let firstPart = true; let pageStartsWithPartHeader = false; let carryPartHeader = false;
  const flush = (background?: string) => { if (blocks.length) { pages.push({ blocks, background }); blocks = []; } pageStartsWithPartHeader = false; carryPartHeader = false; };
  const add = (node: ReactNode, chapter?: string, forceNew = false) => { if (forceNew) flush(); if (chapter && chapterPages[chapter] === undefined) chapterPages[chapter] = pages.length; blocks.push(node); };
  while (i < texts.length) {
    const text = texts[i];
    if (partNames[text]) { const part = partNames[text]; add(<PartHeader key={text} label={text} subtitle={part.subtitle} />, part.id, true); pageStartsWithPartHeader = true; carryPartHeader = ["PART ONE", "PART THREE", "PART FOUR"].includes(text); i += texts[i + 1] === part.subtitle.toUpperCase() ? 2 : 1; continue; }
    if (text === "THEY WERE IN BAND TOO") { const title = texts[i + 1] || "Band profile"; const body: string[] = []; let j = i + 2; if (texts[j]?.startsWith("[Black-and-white")) j += 1; while (j < texts.length && !endMarkers.has(texts[j]) && !poemTitles.has(texts[j]) && !partNames[texts[j]]) { body.push(texts[j]); j += 1; } add(<ProfilePage key={`profile-${i}`} title={title} lines={body} fontScale={fontScale} />); i = j; continue; }
    if (text === "FROM A BAND BUS") { add(<QuoteCard key={`bus-${i}`} label="From a band bus">“{texts[i + 1]}”</QuoteCard>); i += 2; continue; }
    if (text === "Take This With You") { add(<QuoteCard key={`takeaway-${i}`}>{texts[i + 1]}</QuoteCard>); i += 2; continue; }
    if (text === "Before I Step Off This Bus" || (text === "On the Ride Home" && i > 900)) { const prompts: string[] = []; let j = i + 1; while (j < texts.length && !journalEnd.has(texts[j])) { if (texts[j].endsWith(":")) prompts.push(texts[j]); j += 1; } add(<JournalPage key={`journal-${i}`} id={text === "Before I Step Off This Bus" ? "reflections" : "ride-home-reflection"} title={text} prompts={prompts} fontScale={fontScale} />, text === "Before I Step Off This Bus" ? "reflections" : undefined, true); i = j; continue; }
    if (poemTitles.has(text)) {
      const lines: string[] = []; let j = i + 1;
      while (j < texts.length && !poemTitles.has(texts[j]) && !endMarkers.has(texts[j]) && !partNames[texts[j]] && texts[j] !== "Before I Step Off This Bus") { lines.push(texts[j]); j += 1; }
      const companions: ReactNode[] = [];
      const directorQuoteIndex = text === "The Director at the Front" ? lines.findIndex((line) => line.startsWith("“I wanted to feel every musician")) : -1;
      const poemLines = directorQuoteIndex >= 0 ? lines.filter((_, index) => index !== directorQuoteIndex) : lines;
      if (directorQuoteIndex >= 0) {
        companions.push(<BookMusicCard key={`music-${i}`} aliases={sousaTrackAliases} />);
        companions.push(<QuoteCard key={`director-quote-${i}`} className="mt-7">{lines[directorQuoteIndex]}</QuoteCard>);
      }
      while (j < texts.length && (texts[j] === "FROM A BAND BUS" || texts[j] === "Take This With You")) {
        if (texts[j] === "FROM A BAND BUS") { if (text === "The Director at the Front") companions.push(<BookMusicCard key={`music-${i}`} aliases={sousaTrackAliases} />); companions.push(<QuoteCard key={`bus-${j}`} label="From a band bus" className="mt-7">“{texts[j + 1]}”</QuoteCard>); }
        if (texts[j] === "Take This With You") { companions.push(<QuoteCard key={`takeaway-${j}`} className="mt-7">{texts[j + 1]}</QuoteCard>); }
        j += 2;
      }
      if (!(carryPartHeader || (pageStartsWithPartHeader && blocks.length === 1))) flush(); add(<div key={`poem-page-${i}`}><PoemPage title={text} lines={poemLines} fontScale={fontScale} />{companions}</div>); flush(text === "The Bus Is Moving" ? "bus-moving" : undefined); i = j; continue;
    }
    if (text === "Dedication" || text === "Preface" || text === "How to Use This Book") { const isHowTo = text === "How to Use This Book"; const id = text === "Dedication" ? "introduction" : slugify(text); const next = text === "Dedication" ? 16 : text === "Preface" ? 82 : 91; add(<section key={`front-${i}`} id={id} className={`scroll-mt-8 ${firstPart ? "" : "border-t border-[#14203d]/10 pt-8"}`} style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">{text}</p><div className="mt-6">{texts.slice(i + 1, next).map((line, index) => <Paragraph key={`${text}-${index}`}>{line}</Paragraph>)}</div></section>, isHowTo ? id : "introduction", isHowTo); if (isHowTo) flush(); i = next; firstPart = false; continue; }
    if (text.startsWith("“Cherish your journey, and respect your journey.”")) { add(<QuoteCard key={`quote-${i}`} className="my-7">“Cherish your journey, and respect your journey.”<footer className="mt-3 text-sm text-[#536079]">— Lizzo</footer></QuoteCard>); i += 1; continue; }
    if (text === "A WORD TO THE DIRECTOR" || text === "A WORD TO THE PEOPLE IN THE STANDS") { const id = text === "A WORD TO THE DIRECTOR" ? "letters" : "stands"; const body: string[] = []; let j = i + 1; while (j < texts.length && !["A WORD TO THE DIRECTOR", "A WORD TO THE PEOPLE IN THE STANDS", "PEOPLE BEHIND THE WORDS"].includes(texts[j])) { body.push(texts[j]); j += 1; } add(<section key={`letter-${i}`} id={id} className="border-t border-[#14203d]/10 pt-8" style={{ fontSize: `${fontScale}em` }}><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#80558d]">Reflection for the community</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-none text-[#0a1023]">{text.replace("A WORD TO ", "").toLowerCase().replace(/(^| )\w/g, (letter) => letter.toUpperCase())}</h2><div className="mt-7 max-w-3xl">{body.map((line, index) => <Paragraph key={`letter-${i}-${index}`}>{line}</Paragraph>)}</div></section>, "letters", true); i = j; continue; }
    if (text === "PEOPLE BEHIND THE WORDS") break;
    if (/^[\s]*[“"]/.test(text) || text.startsWith("Yo-Yo Ma says")) { add(<QuoteCard key={`quote-${i}`}>{text}</QuoteCard>); i += 1; continue; }
    add(<Paragraph key={`paragraph-${i}`}>{text}</Paragraph>); i += 1;
  }
  flush(); return { pages, chapterPages };
}

export function ManuscriptContent({ fontScale, pageIndex, onPageCount, onChapterPages }: { fontScale: number; pageIndex: number; onPageCount: (count: number) => void; onChapterPages: (pages: Record<string, number>) => void }) {
  const book = useMemo(() => buildPages(fontScale), [fontScale]); const safeIndex = Math.max(0, Math.min(pageIndex, book.pages.length - 1));
  useEffect(() => { onPageCount(book.pages.length); onChapterPages(book.chapterPages); }, [book, onPageCount, onChapterPages]);
  const page = book.pages[safeIndex];
  const isBusMovingPage = page?.background === "bus-moving";
  const pageBackground = `/images/books/book-view/firstnote/page-bgs/${(safeIndex % 6) + 1}.png`;
  return <div data-book-page={safeIndex} className={`relative w-full overflow-hidden px-6 py-8 font-[Georgia,serif] font-normal leading-[1.65] sm:px-10 sm:py-10 lg:px-14 lg:py-12 ${isBusMovingPage ? "bg-[#f8f4ec]" : "rounded-[12px] bg-white bg-top bg-no-repeat"}`} style={isBusMovingPage ? undefined : { backgroundImage: `url(${pageBackground})`, backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}>
    {!isBusMovingPage && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,250,.96)_0%,rgba(255,253,250,.9)_45%,rgba(255,253,250,.48)_62%,rgba(255,253,250,.08)_78%,transparent_100%)]" />}
    {isBusMovingPage && <Image
      src="/images/books/book-view/firstnote/page-bgs/bus-moving.png"
      alt=""
      aria-hidden="true"
      width={1122}
      height={1402}
      sizes="(max-width: 639px) 70vw, (max-width: 1023px) 66vw, 74vw"
      className="pointer-events-none absolute right-[-20%] top-0 z-0 h-auto w-[70%] select-none object-contain object-top-right opacity-20 sm:right-[-8%] sm:w-[66%] sm:opacity-60 md:right-[-2%] md:w-[74%] md:opacity-95"
    />}
    <div className={`relative z-10 ${isBusMovingPage ? "max-w-none md:max-w-[58%]" : ""}`}>{page?.blocks}</div>
  </div>;
}
