"use client";

import NameThatTune from "./pages/NameThatTune";
import CollegeFightSongs from "./pages/CollegeFightSongs";
import MarchingBandCrossword from "./pages/MarchingBandCrossword";
import HalftimeHustle from "./pages/HalftimeHustle";
import ScavengerHunt from "./pages/ScavengerHunt";
import Trivia from "./pages/Trivia";
import TicTacToe from "./pages/Tic-Tac-Toe";
import ColoringOptions from "./pages/ColoringOptions";
import ColoringBook from "./pages/ColoringBook";
import Link from "next/link";

function GameBackLink() {
  return <div className="absolute inset-x-0 top-0 z-20 px-6 pt-24 sm:px-10 lg:px-16"><Link href="/play" className="inline-flex rounded-full border border-[var(--navy)]/15 bg-white/90 px-4 py-2 text-sm font-bold text-[var(--navy)] shadow-sm backdrop-blur transition hover:bg-[var(--gold)]">← Back to games</Link></div>;
}

function ActivityBackLink() {
  return <div className="relative z-20 bg-[var(--cream)] px-6 py-3 sm:px-10 lg:px-16"><Link href="/activities" className="inline-flex rounded-full border border-[var(--navy)]/15 bg-white/90 px-4 py-2 text-sm font-bold text-[var(--navy)] shadow-sm transition hover:bg-[var(--gold)]">← Back to activities</Link></div>;
}

export function ExactGame({ slug }) {
  const pages = {
    "name-that-tune": NameThatTune,
    "college-fight-songs": CollegeFightSongs,
    "marching-band-crossword": MarchingBandCrossword,
    "halftime-hustle": HalftimeHustle,
    "trivia": Trivia,
    "tic-tac-toe": TicTacToe,
  };
  const Page = pages[slug];
  return Page ? <div className="relative"><GameBackLink /><Page /></div> : <p>Game not found.</p>;
}

export function ExactActivity({ slug, templateId }) {
  if (slug === "scavenger-hunt") return <div className="relative"><ActivityBackLink /><ScavengerHunt /></div>;
  if (slug === "coloring") return <div className="relative"><ActivityBackLink />{templateId ? <ColoringBook /> : <ColoringOptions />}</div>;
  return <p>Activity not found.</p>;
}
