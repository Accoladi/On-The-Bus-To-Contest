// ============================================================================
// fightSongCrosswordData.js — Crossword Data for ALL Puzzles
// ============================================================================
//
// Exports:
//   MB_PUZZLES  — Marching Band Terms (Yellow / Level I, Green / Level II, Blue / Level III)
//   FS_PUZZLES  — College Fight Songs (one connected puzzle)
//   buildPuzzle — grid builder shared by both games
//
// All puzzles are auto-generated via generatePuzzleFromWords() using the
// crossword-layout-generator library. Answers are sanitized at build time.
// ============================================================================

import { generatePuzzleFromWords, sanitize } from './generateCrosswordLayout';

// ─── YELLOW / Level I — 25 common marching band terms ──────────────────────

const YELLOW_WORDS = [
    { answer: 'ALIGNMENT', clue: 'Straight lines in ranks, files, and diagonals' },
    { answer: 'ATEASE', clue: 'Oral command: keep the right foot in place, remain silent' },
    { answer: 'BATTERY', clue: 'Marching percussion section that carries drums and marches' },
    { answer: 'CADENCE', clue: 'Beat played by percussion during a parade to indicate marching pace' },
    { answer: 'COMPANYFRONT', clue: 'Formation where the entire band is in one large line, marching side by side' },
    { answer: 'CUTOFF', clue: 'Signal that tells the band to stop playing' },
    { answer: 'DINKLES', clue: 'Special marching shoes worn during shows and competitions' },
    { answer: 'DOTBOOK', clue: "Small notebook or cards holding each student's drill positions" },
    { answer: 'DOUBLETIME', clue: 'Step where band members move at twice the speed of the music' },
    { answer: 'DOWNBEAT', clue: 'First beat of a measure of music' },
    { answer: 'DRUMLINE', clue: 'Field drums collected in a single marching unit' },
    { answer: 'DRUMMAJOR', clue: 'Student conductor who directs the marching band as it plays' },
    { answer: 'FIELDSHOW', clue: 'Choreographed, marched musical routine performed on the field' },
    { answer: 'FORWARDMARCH', clue: 'Command that tells the group: begin marching forward' },
    { answer: 'GUARD', clue: 'Students who add color and style with flags and props (Color Guard)' },
    { answer: 'HALFTIMESHOW', clue: 'Performance on the football field between the two halves of a game' },
    { answer: 'MARCHINGBAND', clue: 'A band that moves and plays at the same time' },
    { answer: 'MARKTIME', clue: 'Marching in place' },
    { answer: 'PODIUM', clue: 'Raised platform where the Drum Majors stand' },
    { answer: 'QUADS', clue: 'Set of 4–6 connected drums carried by a Battery member (Tenors)' },
    { answer: 'ROLLOFF', clue: 'Drum cadence that tells the band to play' },
    { answer: 'RUNTHROUGH', clue: 'Practicing the entire marching band show at once' },
    { answer: 'SALUTE', clue: 'Formal act to show respect or honor' },
    { answer: 'TEMPO', clue: 'Speed of the music, expressed in beats per minute' },
    { answer: 'WINDS', clue: 'Non-percussion instruments played by blowing air' },
];

// ─── GREEN / Level II — 48 intermediate terms and commands ──────────────────

const GREEN_WORDS = [
    { answer: 'ACCENT', clue: 'Special emphasis or stress applied to a note or beat in the music' },
    { answer: 'BANDBLOCK', clue: 'Rectangular formation used while parade marching, with even file and rank spacing' },
    { answer: 'PRESSBOX', clue: "Slang for the judge's box at the top of the football stadium" },
    { answer: 'CAPTIONAWARDS', clue: 'Specific awards marching bands win at competitions (e.g. best percussion, best music)' },
    { answer: 'CARRIAGE', clue: 'How a person carries their body' },
    { answer: 'CLEANING', clue: 'Making each movement well defined and precise through repeated practice' },
    { answer: 'COLUMN', clue: 'Two or more people standing behind one another (same as File)' },
    { answer: 'CONTRACTION', clue: 'Movement which produces smaller intervals between members' },
    { answer: 'COUNTERMARCH', clue: 'Precise drill where the band turns rank by rank and marches the other direction' },
    { answer: 'COVER', clue: 'Straight line in a column or file, aligned on the front person' },
    { answer: 'DISMISSED', clue: 'Oral command: you are released from the rehearsal or drill' },
    { answer: 'DISTANCE', clue: 'Spacing between individuals front to back' },
    { answer: 'DRBEAT', clue: 'Metronome-style device connected to a megaphone' },
    { answer: 'DRESS', clue: 'Straight line in a rank, aligned on the left, center, or right person' },
    { answer: 'DRILL', clue: 'The steps and positions that make up the marching band show' },
    { answer: 'EIGHTTOFIVE', clue: 'Marching at a stride of eight steps to five yards' },
    { answer: 'EXECUTION', clue: 'How well or precisely something is done; a key part of judging' },
    { answer: 'EXPANSION', clue: 'Movement which produces larger intervals between members' },
    { answer: 'FALLIN', clue: 'Oral command: get into a formation' },
    { answer: 'FALLOUT', clue: 'Oral command: leave a formation' },
    { answer: 'FILE', clue: 'Two or more people standing behind one another (same as Column)' },
    { answer: 'FOLLOWTHELEADER', clue: 'Movement where remaining performers follow the lead performer\'s path' },
    { answer: 'FRONT', clue: 'The distance across the first rank of the band' },
    { answer: 'GENERALEFFECT', clue: 'G.E.: judging caption for the total overall effect of the performance' },
    { answer: 'GLIDESTEP', clue: 'Gliding march style where the heel contacts first and weight rolls to the toe' },
    { answer: 'GUIDE', clue: 'Correcting the alignment of ranks, files, or diagonals while moving' },
    { answer: 'HALFTEMPOSTEP', clue: 'Step where band members move at half of the speed of the music' },
    { answer: 'INTERVAL', clue: 'The distance between two people standing side by side' },
    { answer: 'MUSICANALYSIS', clue: 'M.A.: judging caption for the musical aspect of the performance' },
    { answer: 'MARCHANDMANEUVER', clue: 'M & M: judging caption focusing on the precision of marching movement' },
    { answer: 'MOVINGGATE', clue: 'A line or curve which rotates around a moving point at the end of the form' },
    { answer: 'ORALCOMMAND', clue: 'Spoken instruction with a preparation part and an execution part' },
    { answer: 'PARADEREST', clue: 'A relaxed position of attention' },
    { answer: 'PIT', clue: 'Percussion section that does not march; staged at the front of the band' },
    { answer: 'PITCREW', clue: 'Volunteers who help move, load, assemble, and push PIT instruments onto the field' },
    { answer: 'RANK', clue: 'Two or more people standing side by side' },
    { answer: 'RESET', clue: 'Direction to return to an early point and get ready to repeat the action' },
    { answer: 'RIFLES', clue: 'Imitation rifles carried by the Guard to visually interpret the music' },
    { answer: 'SHIFTMARCHING', clue: 'Marching in one direction while twisting the upper body to play in another' },
    { answer: 'SHOW', clue: 'Slang for a band\'s field performance (e.g. "What is the theme for the Show?"' },
    { answer: 'SECTION', clue: 'Students who play the same instruments (e.g. the trumpet section)' },
    { answer: 'SECTIONLEADER', clue: 'Student in charge of a marching band instrument section' },
    { answer: 'SETS', clue: 'Formations the band makes; students receive drill charts for their positions' },
    { answer: 'SHAKO', clue: 'Marching band uniform hat' },
    { answer: 'SIXTOFIVE', clue: 'Marching with a stride size of six steps to every five yards' },
    { answer: 'STANDTUNES', clue: 'Music played during football games from the stands' },
    { answer: 'STEPOFF', clue: 'The precise moment when a marching band parade performance starts' },
    { answer: 'TOSS', clue: 'Move where the color guard throws a flag or rifle into the air and catches it' },
];

// ─── BLUE / Level III — 28 advanced terms ───────────────────────────────────

const BLUE_WORDS = [
    { answer: 'ATTENHUT', clue: 'Oral command: go to attention' },
    { answer: 'CORPS', clue: 'Short name for Drum and Bugle Corps; a marching group with bugles, percussion, and flags' },
    { answer: 'COVERDOWN', clue: 'Oral command: straighten the column or file' },
    { answer: 'DETAILHALT', clue: 'Oral command: stop marching' },
    { answer: 'DOT', clue: 'Individual position on the field, measured by steps from hashes, sidelines, and yard lines' },
    { answer: 'DOTSHEET', clue: 'Sheet that gives your individual field positions, taught at band camp' },
    { answer: 'DRILLCHART', clue: 'Chart showing the position of the entire band in different sets of the music' },
    { answer: 'DRUMMAJORSSTAND', clue: 'Platform on the field, usually 3–5 feet high, for the drum major to conduct' },
    { answer: 'FACE', clue: 'Oral command to pivot and look toward a different direction (e.g. Left Face, About Face)' },
    { answer: 'FLAGS', clue: 'Flags or silks used by the Guard during a marching band show' },
    { answer: 'ICTUS', clue: 'Stress or accent marking the rhythm; the conductor\'s hand movement showing each beat' },
    { answer: 'INPLACETURNS', clue: 'Marching movement where a person rotates right or left while marking time' },
    { answer: 'MUSICEFFECT', clue: 'M.E.: judging caption for the overall effect created by the music performance' },
    { answer: 'MARKTIMEMARCH', clue: 'Oral command: begin marching in place' },
    { answer: 'MOVEMENT', clue: 'Songs a marching band plays; shows usually have 3 movements' },
    { answer: 'OBLIQUE', clue: '45-degree movement — half of a right or left flank' },
    { answer: 'POSTURE', clue: 'How a person stands or holds their body' },
    { answer: 'PLUMES', clue: 'Fragile feathers on the marching band uniform hats' },
    { answer: 'PRANCESTEP', clue: 'High-knee march where the foot lifts to the opposite knee then toe contacts first' },
    { answer: 'PREPARATORYBEAT', clue: 'The rest just before the first note to be played by the band' },
    { answer: 'RELEASE', clue: 'The cut of a musical sound' },
    { answer: 'RESHAPE', clue: 'Movement during which the formation constantly changes and step size varies' },
    { answer: 'ROTATION', clue: 'Person turns right or left while marking time' },
    { answer: 'SABERS', clue: 'Imitation swords carried by the Guard to visually interpret the music' },
    { answer: 'SHOWMANSHIP', clue: 'Overall effect created by the performance and how well performers sell it' },
    { answer: 'SECTIONAL', clue: 'Practice or rehearsal by only one section of instruments' },
    { answer: 'SIGNAL', clue: 'Gesture or action that conveys a command' },
    { answer: 'WHEEL', clue: 'Rotation of a line or curve around a stationary point in the center of the form' },
];

// ─── Build MB puzzles using auto-generator ──────────────────────────────────

export const MB_PUZZLES = [
    generatePuzzleFromWords(YELLOW_WORDS, {
        id: 'mb-yellow',
        theme: 'Yellow / Level I',
        difficulty: 'easy',
        description: 'Common marching band terms — a great starting point!',
        maxWords: 12,
    }),
    generatePuzzleFromWords(GREEN_WORDS, {
        id: 'mb-green',
        theme: 'Green / Level II',
        difficulty: 'medium',
        description: 'Intermediate terms and commands used by marching bands.',
        maxWords: 14,
    }),
    generatePuzzleFromWords(BLUE_WORDS, {
        id: 'mb-blue',
        theme: 'Blue / Level III',
        difficulty: 'hard',
        description: 'Advanced vocabulary for experienced marching band members.',
        maxWords: 15,
    }),
];


// ─── COLLEGE FIGHT SONGS ────────────────────────────────────────────────────

export const FS_PUZZLES = [
    {
        id: 'fs-main',
        theme: 'College Fight Songs',
        difficulty: 'medium',
        description: 'Do you know your college fight songs? Solve this crossword!',
        rows: 38,
        cols: 36,
        words: [
            // DOWN
            { word: 'BOOMERSOONER', direction: 'down', row: 0, col: 23, clue: 'University of Oklahoma fight song', audioUrl: '/audio/fight-songs/boomer-sooner.mp3', youtubeId: '5ErtzJSUiQY' },
            { word: 'ONWISCONSIN', direction: 'down', row: 3, col: 10, clue: 'University of Wisconsin fight song', audioUrl: '/audio/fight-songs/on-wisconsin.mp3', youtubeId: 'DPwDoTbRDag' },
            { word: 'IOWAFIGHTSONG', direction: 'down', row: 4, col: 17, clue: 'University of Iowa fight song', audioUrl: '/audio/fight-songs/iowa-fight-song.mp3', youtubeId: 'l4ANP8g8wrE' },
            { word: 'ROCKYTOP', direction: 'down', row: 4, col: 21, clue: 'University of Tennessee fight song', audioUrl: '/audio/fight-songs/rocky-top.mp3', youtubeId: 'vDDy8_H2XnA' },
            { word: 'WAREAGLE', direction: 'down', row: 4, col: 26, clue: 'Auburn University fight song', audioUrl: '/audio/fight-songs/war-eagle.mp3', youtubeId: 'sMvdigCaGh8' },
            { word: 'HAILTOGEORGIA', direction: 'down', row: 7, col: 13, clue: 'University of Georgia fight song', audioUrl: '/audio/fight-songs/hail-to-georgia.mp3', youtubeId: '_Hodv8GTajg' },
            { word: 'YEAALABAMA', direction: 'down', row: 9, col: 30, clue: 'University of Alabama fight song', audioUrl: '/audio/fight-songs/yea-alabama.mp3', youtubeId: '0GBp1qY_lWI' },
            { word: 'THEORANGEANDBLUE', direction: 'down', row: 21, col: 16, clue: 'University of Florida fight song', audioUrl: '/audio/fight-songs/the-orange-and-blue.mp3', youtubeId: 'dq1PPmUQKjY' },
            { word: 'ACROSSTHEFIELD', direction: 'down', row: 24, col: 19, clue: 'Ohio State University fight song', audioUrl: '/audio/fight-songs/across-the-field.mp3', youtubeId: 'uDI1qWHqJt4' },
            { word: 'TIGERRAG', direction: 'down', row: 25, col: 28, clue: 'Clemson University fight song', audioUrl: '/audio/fight-songs/tiger-rag.mp3', youtubeId: 'tGl_XIGlhfw' },
            { word: 'HAILVARSITY', direction: 'down', row: 26, col: 24, clue: 'University of Nebraska fight song', audioUrl: '/audio/fight-songs/hail-varsity.mp3', youtubeId: 'sT3nNOFffbA' },
            { word: 'FIGHTON', direction: 'down', row: 27, col: 26, clue: 'University of Southern California fight song', audioUrl: '/audio/fight-songs/fight-on.mp3', youtubeId: 'xh_oEsfHxtQ' },
            { word: 'NOTREDAMEVICTORYMARCH', direction: 'down', row: 15, col: 21, clue: 'University of Notre Dame fight song', audioUrl: '/audio/fight-songs/notre-dame-victory-march.mp3', youtubeId: 'BLEcm7S1WsY' },

            // ACROSS
            { word: 'HAILPURDUE', direction: 'across', row: 11, col: 17, clue: 'Purdue University fight song', audioUrl: '/audio/fight-songs/hail-purdue.mp3', youtubeId: 'YBPCo2j9s3w' },
            { word: 'VICTORS', direction: 'across', row: 12, col: 9, clue: 'University of Michigan fight song', audioUrl: '/audio/fight-songs/victors.mp3', youtubeId: 'H80UZVzIbzg' },
            { word: 'FSUFIGHTSONG', direction: 'across', row: 13, col: 16, clue: 'Florida State University fight song', audioUrl: '/audio/fight-songs/fsu-fight-song.mp3', youtubeId: '5qY-5SBY6UA' },
            { word: 'SONSOFWESTWOOD', direction: 'across', row: 15, col: 1, clue: 'UCLA fight song', audioUrl: '/audio/fight-songs/sons-of-westwood.mp3', youtubeId: 'p6WthgDvUSY' },
            { word: 'FIGHTFORLSU', direction: 'across', row: 16, col: 15, clue: 'Louisiana State University fight song', audioUrl: '/audio/fight-songs/fight-for-lsu.mp3', youtubeId: 'Dsfte9YHoX0' },
            { word: 'RAMBLINWRECKFROMGEORGIATECH', direction: 'across', row: 18, col: 8, clue: 'Georgia Tech University fight song', audioUrl: '/audio/fight-songs/ramblin-wreck-from-georgia-tech.mp3', youtubeId: 'ZOBt0qTujho' },
            { word: 'INDIANAOURINDIANA', direction: 'across', row: 20, col: 19, clue: 'Indiana University fight song', audioUrl: '/audio/fight-songs/indiana-our-indiana.mp3', youtubeId: '5gj1qq7p-YQ' },
            { word: 'BOWDOWNTOWASHINGTON', direction: 'across', row: 21, col: 0, clue: 'University of Washington fight song', audioUrl: '/audio/fight-songs/bow-down-to-washington.mp3', youtubeId: '24Y4aT52ekU' },
            { word: 'MIGHTYOREGON', direction: 'across', row: 22, col: 21, clue: 'University of Oregon fight song', audioUrl: '/audio/fight-songs/mighty-oregon.mp3', youtubeId: 'q4TvpCpslMQ' },
            { word: 'TENTHOUSANDMENOFHARVARD', direction: 'across', row: 24, col: 2, clue: 'Harvard University fight song', audioUrl: '/audio/fight-songs/ten-thousand-men-of-harvard.mp3', youtubeId: 'Xeuu_NprSAU' },
            { word: 'ONBRAVEOLDARMYTEAM', direction: 'across', row: 26, col: 0, clue: 'United States Military Academy fight song', audioUrl: '/audio/fight-songs/on-brave-old-army-team.mp3', youtubeId: 'OMEqkdoEXXQ' },
            { word: 'TEXASFIGHT', direction: 'across', row: 27, col: 21, clue: 'University of Texas fight song', audioUrl: '/audio/fight-songs/texas-fight.mp3', youtubeId: 'JCH1SdRYA40' },
            { word: 'ANCHORSAWEIGH', direction: 'across', row: 28, col: 5, clue: 'U.S. Naval Academy fight song', audioUrl: '/audio/fight-songs/anchors-aweigh.mp3', youtubeId: 'j72CJaDWSA8' },
            { word: 'AGGIEWARHYMN', direction: 'across', row: 31, col: 5, clue: 'Texas A&M University fight song', audioUrl: '/audio/fight-songs/aggie-war-hymn.mp3', youtubeId: 'KpRuDylcttY' },
            { word: 'VICTORYFORMSU', direction: 'across', row: 35, col: 4, clue: 'Michigan State University fight song', audioUrl: '/audio/fight-songs/victory-for-msu.mp3', youtubeId: 's4WUCE4U488' },
        ],
    },
];

// ─── Backward-compat export (old single-tab page) ──────────────────────────
export const PUZZLES = [...MB_PUZZLES.slice(0, 3), ...FS_PUZZLES];

// ─── buildPuzzle ─────────────────────────────────────────────────────────────
export function buildPuzzle(puzzle) {
    const { rows, cols, words } = puzzle;

    const cellMap = {};
    words.forEach(({ word: rawWord, direction: dir, row, col }, idx) => {
        const word = sanitize(rawWord);
        for (let i = 0; i < word.length; i++) {
            const r = dir === 'down' ? row + i : row;
            const c = dir === 'across' ? col + i : col;
            if (r < rows && c < cols) {
                const k = `${r},${c}`;
                if (!cellMap[k]) cellMap[k] = { letter: word[i], wordIds: [] };
                if (!cellMap[k].wordIds.includes(idx)) cellMap[k].wordIds.push(idx);
            }
        }
    });

    // Black squares: every cell that has no letter.
    // The 180° symmetric counterpart is only also blacked-out when it too is
    // empty — this keeps hand-crafted puzzles working while preventing the
    // symmetry from overwriting letter cells in auto-generated layouts.
    const blackSet = new Set();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!cellMap[`${r},${c}`]) {
                blackSet.add(`${r},${c}`);
                const rr = rows - 1 - r;
                const cc = cols - 1 - c;
                if (!cellMap[`${rr},${cc}`]) {
                    blackSet.add(`${rr},${cc}`);
                }
            }
        }
    }

    const grid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => cellMap[`${r},${c}`] ?? { letter: null, wordIds: [] })
    );

    // Clue numbers in reading order.
    // We assign numbers to every cell that is the DECLARED start of at least
    // one word in the wordList, scanned top-to-bottom / left-to-right.
    // This is always correct regardless of grid topology — it avoids the
    // topology-based heuristic that failed when a Down word started directly
    // adjacent to an Across word (no black cell above/left to trigger it).
    const wordStartKeys = new Set(words.map(w => `${w.row},${w.col}`));
    const starts = new Map();
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (wordStartKeys.has(`${r},${c}`)) {
                starts.set(`${r},${c}`, counter++);
            }
        }
    }

    const wordList = words.map((w, idx) => ({
        ...w,
        word: sanitize(w.word),
        id: idx,
        clueNum: starts.get(`${w.row},${w.col}`) ?? null,
    }));

    return { grid, wordList, blackSet };
}
