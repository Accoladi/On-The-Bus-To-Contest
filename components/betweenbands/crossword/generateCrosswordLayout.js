// ============================================================================
// generateCrosswordLayout.js
// ============================================================================
//
// Wraps `crossword-layout-generator` to produce puzzle objects compatible with
// the existing buildPuzzle() engine in fightSongCrosswordData.js.
//
// Usage:
//   import { generatePuzzleFromWords } from './generateCrosswordLayout';
//
//   const puzzle = generatePuzzleFromWords([
//     { answer: 'MARKTIME', clue: 'Marching in place' },
//     { answer: 'CADENCE',  clue: 'Beat played by percussion during a parade' },
//     ...
//   ], {
//     id: 'my-puzzle',
//     theme: 'My Puzzle',
//     difficulty: 'easy',
//     description: 'A sample auto-generated puzzle.',
//   });
//
//   // puzzle is ready to pass directly to buildPuzzle(puzzle)
// ============================================================================

import clg from 'crossword-layout-generator';

/***
 * Sanitize an answer for grid placement and answer checking:
 * uppercase, strip spaces, punctuation, apostrophes, parens, dots, ampersands
 */
export const sanitize = (s) => s.toUpperCase().replace(/[\s.'()&,\-!?;:]/g, '');

/**
 * Convert a word-list into a puzzle object accepted by buildPuzzle().
 *
 * @param {Array<{ answer: string, clue: string }>} wordList
 *   Each item has an `answer` (the hidden word, any case) and a `clue`.
 *
 * @param {object} [meta]
 * @param {string} [meta.id]          - Unique puzzle ID (default: 'auto-puzzle')
 * @param {string} [meta.theme]       - Display name / tab label
 * @param {string} [meta.difficulty]  - 'easy' | 'medium' | 'hard'
 * @param {string} [meta.description] - Short description shown under the tab
 * @param {number} [meta.maxWords]    - Max words to feed the generator (caps puzzle size)
 *
 * @returns {{ id, theme, difficulty, description, rows, cols, words }}
 *   A puzzle object ready for buildPuzzle().
 *   `words` contains only the entries the generator successfully placed
 *   (items where orientation === "none" are silently dropped).
 */
export function generatePuzzleFromWords(wordList, meta = {}) {
    const {
        id = 'auto-puzzle',
        theme = 'Auto-Generated',
        difficulty = 'medium',
        description = 'Automatically generated crossword layout.',
        maxWords,
    } = meta;

    // The package expects lowercase answers; we'll uppercase our
    // answers for display but feed lowercase to the generator.
    let input = wordList.map(({ answer, clue }) => ({
        answer: sanitize(answer),
        clue,
    }));

    // Cap the word list if maxWords is specified
    if (maxWords && input.length > maxWords) {
        input = input.slice(0, maxWords);
    }

    // Run the layout generator.
    // Returns: { rows, cols, table, table_string, result }
    // result items: { answer, clue, startx, starty, orientation, position }
    //   startx / starty are 1-based after internal trimTable()
    const layout = clg.generateLayout(input);

    // Filter out words the generator couldn't place.
    const placed = layout.result.filter(item => item.orientation !== 'none');

    if (placed.length === 0) {
        console.warn('[generateCrosswordLayout] No words could be placed. Check your word list for conflicts.');
        return { id, theme, difficulty, description, rows: 1, cols: 1, words: [] };
    }

    // Convert to the format expected by buildPuzzle():
    //   { word, direction, row, col, clue }
    // The package's startx = column (1-based), starty = row (1-based).
    const words = placed.map(item => ({
        word: item.answer,            // already uppercase
        direction: item.orientation,  // 'across' | 'down'
        row: item.starty - 1,         // convert 1-based → 0-based
        col: item.startx - 1,         // convert 1-based → 0-based
        clue: item.clue,
    }));

    return {
        id,
        theme,
        difficulty,
        description,
        rows: layout.rows,
        cols: layout.cols,
        words,
    };
}

// Alias kept for convenience
export default generatePuzzleFromWords;
