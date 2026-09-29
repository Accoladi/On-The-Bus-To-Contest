import React from 'react';
import CrosswordGame from '../crossword/FightSongCrossword';
import { MB_PUZZLES } from '../crossword/fightSongCrosswordData';

export default function MarchingBandCrossword() {
    return (
        <CrosswordGame
            puzzleSet={MB_PUZZLES}
            gameTitle="🥁 Marching Band Terms Crossword"
            gameSubtitle="Test your marching band vocabulary — choose a difficulty and get solving!"
            backTo="/play"
            backLabel="All Games"
            bgImage="url('/entertainment/games/marching-band-crossword-1.png')"
        />
    );
}
