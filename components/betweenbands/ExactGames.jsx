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
  return Page ? <Page /> : <p>Game not found.</p>;
}

export function ExactActivity({ slug, templateId }) {
  if (slug === "scavenger-hunt") return <ScavengerHunt />;
  if (slug === "coloring") return templateId ? <ColoringBook /> : <ColoringOptions />;
  return <p>Activity not found.</p>;
}
