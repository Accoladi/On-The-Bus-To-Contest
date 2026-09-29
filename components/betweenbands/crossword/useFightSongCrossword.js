import { useState, useCallback, useEffect } from 'react';
import { MB_PUZZLES, buildPuzzle } from './fightSongCrosswordData';

/**
 * Returns the "other" word id that shares the same cell when
 * the user clicks on a cell that belongs to multiple words (toggle direction).
 */
function getNextWordId(cell, currentWordId) {
    const ids = cell.wordIds;
    if (!ids || ids.length === 0) return null;
    if (ids.length === 1) return ids[0];
    const currentIdx = ids.indexOf(currentWordId);
    return ids[(currentIdx + 1) % ids.length];
}

/** puzzleSet defaults to MB_PUZZLES; pass FS_PUZZLES for the fight-songs page */
export function useFightSongCrossword(puzzleSet = MB_PUZZLES) {
    const [puzzleIndex, setPuzzleIndex] = useState(0);

    // Build puzzle whenever puzzleIndex changes
    const puzzle = puzzleSet[puzzleIndex];
    const isComingSoon = !puzzle.words || puzzle.words.length === 0;
    const { grid, wordList, blackSet } = isComingSoon
        ? { grid: [], wordList: [], blackSet: new Set() }
        : buildPuzzle(puzzle);


    // Flat answer grid: [row][col] = '' | letter typed by user
    const emptyAnswers = () =>
        Array.from({ length: puzzle.rows }, () =>
            Array.from({ length: puzzle.cols }, () => '')
        );

    const [answers, setAnswers] = useState(emptyAnswers);
    const [activeWordId, setActiveWordId] = useState(0);
    const [activeCellPos, setActiveCellPos] = useState({ row: wordList[0]?.row ?? 0, col: wordList[0]?.col ?? 0 });
    const [checkState, setCheckState] = useState(null); // null | 'checked' | 'revealed'
    const [won, setWon] = useState(false);

    // Reset when puzzle tab switches
    useEffect(() => {
        if (!isComingSoon) {
            const { wordList: wl } = buildPuzzle(puzzleSet[puzzleIndex]);
            setAnswers(emptyAnswers());
            setActiveWordId(0);
            setActiveCellPos({ row: wl[0]?.row ?? 0, col: wl[0]?.col ?? 0 });
            setCheckState(null);
            setWon(false);
        } else {
            setAnswers([]);
            setActiveWordId(0);
            setActiveCellPos({ row: 0, col: 0 });
            setCheckState(null);
            setWon(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puzzleIndex]);

    const activeWord = wordList[activeWordId] ?? null;

    /** Cells belonging to the active word */
    const activeCells = activeWord
        ? Array.from({ length: activeWord.word.length }, (_, i) => ({
            row: activeWord.direction === 'down' ? activeWord.row + i : activeWord.row,
            col: activeWord.direction === 'across' ? activeWord.col + i : activeWord.col,
        }))
        : [];

    /** Index of activeCellPos within the active word's cells */
    const activeCellIndex = activeCells.findIndex(
        c => c.row === activeCellPos.row && c.col === activeCellPos.col
    );

    const selectWord = useCallback((wordId, row, col) => {
        setActiveWordId(wordId);
        setActiveCellPos({ row, col });
        setCheckState(null);
    }, []);

    const handleCellClick = useCallback((row, col) => {
        const cell = grid[row]?.[col];
        if (!cell || cell.letter === null || blackSet.has(`${row},${col}`)) return;

        // If same cell clicked again, toggle to the other word sharing the cell
        if (row === activeCellPos.row && col === activeCellPos.col) {
            const nextId = getNextWordId(cell, activeWordId);
            if (nextId !== null) setActiveWordId(nextId);
            return;
        }

        // Prefer the current active word's direction if the cell is part of it
        const sameWordId = cell.wordIds.find(id => id === activeWordId);
        const newWordId = sameWordId !== undefined ? sameWordId : (cell.wordIds[0] ?? activeWordId);
        selectWord(newWordId, row, col);
    }, [grid, activeCellPos, activeWordId, selectWord]);

    const handleClueClick = useCallback((wordId) => {
        const word = wordList[wordId];
        if (!word) return;
        selectWord(wordId, word.row, word.col);
    }, [wordList, selectWord]);

    const handleKeyDown = useCallback((e) => {
        if (!activeWord) return;
        const key = e.key.toUpperCase();

        if (/^[A-Z]$/.test(key)) {
            e.preventDefault();
            const newAnswers = answers.map(r => [...r]);
            newAnswers[activeCellPos.row][activeCellPos.col] = key;
            setAnswers(newAnswers);
            setCheckState(null);

            // advance cursor
            const nextIdx = (activeCellIndex + 1 < activeCells.length) ? activeCellIndex + 1 : activeCellIndex;
            setActiveCellPos(activeCells[nextIdx]);

        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const cur = answers[activeCellPos.row][activeCellPos.col];
            const newAnswers = answers.map(r => [...r]);
            if (cur !== '') {
                newAnswers[activeCellPos.row][activeCellPos.col] = '';
                setAnswers(newAnswers);
            } else if (activeCellIndex > 0) {
                const prevCell = activeCells[activeCellIndex - 1];
                newAnswers[prevCell.row][prevCell.col] = '';
                setAnswers(newAnswers);
                setActiveCellPos(prevCell);
            }
            setCheckState(null);

        } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const isAcross = activeWord.direction === 'across';
            const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
            const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
            const alignedMove = (isAcross && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) ||
                (!isAcross && (e.key === 'ArrowDown' || e.key === 'ArrowUp'));

            if (alignedMove) {
                if (isForward && activeCellIndex < activeCells.length - 1) {
                    setActiveCellPos(activeCells[activeCellIndex + 1]);
                } else if (isBackward && activeCellIndex > 0) {
                    setActiveCellPos(activeCells[activeCellIndex - 1]);
                }
            } else {
                // switch direction — toggle if the cell has another word
                const cell = grid[activeCellPos.row]?.[activeCellPos.col];
                if (cell) {
                    const nextId = getNextWordId(cell, activeWordId);
                    if (nextId !== null) setActiveWordId(nextId);
                }
            }

        } else if (e.key === 'Tab') {
            e.preventDefault();
            const nextId = (activeWordId + (e.shiftKey ? -1 : 1) + wordList.length) % wordList.length;
            const nextWord = wordList[nextId];
            if (nextWord) selectWord(nextId, nextWord.row, nextWord.col);
        }
    }, [activeWord, activeWordId, activeCellPos, activeCellIndex, activeCells, answers, grid, wordList, selectWord]);

    const checkAnswers = useCallback(() => {
        setCheckState('checked');
        // Check win: every filled cell matches
        const allCorrect = wordList.every(w => {
            for (let i = 0; i < w.word.length; i++) {
                const r = w.direction === 'down' ? w.row + i : w.row;
                const c = w.direction === 'across' ? w.col + i : w.col;
                if ((answers[r]?.[c] ?? '') !== w.word[i]) return false;
            }
            return true;
        });
        if (allCorrect) setWon(true);
    }, [answers, wordList]);

    const revealAnswers = useCallback(() => {
        const newAnswers = answers.map(r => [...r]);
        wordList.forEach(w => {
            for (let i = 0; i < w.word.length; i++) {
                const r = w.direction === 'down' ? w.row + i : w.row;
                const c = w.direction === 'across' ? w.col + i : w.col;
                newAnswers[r][c] = w.word[i];
            }
        });
        setAnswers(newAnswers);
        setCheckState('revealed');
    }, [answers, wordList]);

    const resetPuzzle = useCallback(() => {
        setAnswers(emptyAnswers());
        setActiveWordId(0);
        const first = wordList[0];
        setActiveCellPos({ row: first?.row ?? 0, col: first?.col ?? 0 });
        setCheckState(null);
        setWon(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puzzle.rows, puzzle.cols, wordList]);

    /** Per-cell status for styling */
    const getCellStatus = (row, col) => {
        const cell = grid[row]?.[col];
        if (!cell || cell.letter === null) return 'empty';
        const isActive = activeCells.some(c => c.row === row && c.col === col);
        const isCurrentCell = row === activeCellPos.row && col === activeCellPos.col;
        const typed = answers[row]?.[col] ?? '';

        if (checkState === 'checked' && typed !== '') {
            if (typed === cell.letter) return isCurrentCell ? 'correct-active' : isActive ? 'correct-highlighted' : 'correct';
            return isCurrentCell ? 'incorrect-active' : isActive ? 'incorrect-highlighted' : 'incorrect';
        }
        if (checkState === 'revealed') return isCurrentCell ? 'revealed-active' : isActive ? 'revealed-highlighted' : 'revealed';

        if (isCurrentCell) return 'current';
        if (isActive) return 'highlighted';
        return 'filled';
    };

    return {
        puzzle,
        puzzleIndex,
        setPuzzleIndex,
        isComingSoon,
        grid,
        wordList,
        blackSet,
        answers,
        activeWordId,
        activeCellPos,
        activeCells,
        checkState,
        won,
        handleCellClick,
        handleClueClick,
        handleKeyDown,
        checkAnswers,
        revealAnswers,
        resetPuzzle,
        getCellStatus,
    };
}
