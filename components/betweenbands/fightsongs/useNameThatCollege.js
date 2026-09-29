'use client';
// ============================================================================
// useNameThatCollege.js — Game state machine for "Name That College"
// ============================================================================
//
// Same shape as useNameThatTune, but the player identifies the COLLEGE that a
// fight song belongs to (not the song). Each game is 10 rounds drawn at random
// from COLLEGE_SONGS, so replaying produces a fresh set. Each round offers 4
// college choices and one teasing clue: the song's partially-revealed name.
//
// Audio playback lives in useYouTubePlayer; UI lives in NameThatCollege.jsx.
// ============================================================================

import { useState, useCallback, useRef } from 'react';
import { COLLEGE_SONGS, OTHER_FOOTBALL_COLLEGES } from './fightSongsData';

// ── Time-based point thresholds (fight songs run ~1 min, so scaled up) ──
const POINT_THRESHOLDS = [
  { maxSeconds: 3, points: 50 },
  { maxSeconds: 5, points: 30 },
  { maxSeconds: 10, points: 20 },
  { maxSeconds: 20, points: 10 },
  { maxSeconds: 30, points: 5 },
];

const getPointsForTime = (seconds) => {
  for (const { maxSeconds, points } of POINT_THRESHOLDS) {
    if (seconds <= maxSeconds) return points;
  }
  return 1;
};

const FEEDBACK_TIERS = [
  { minPoints: 40, messages: ['Perfect pitch for pageantry! 🎺', 'Instant recognition — section-leader ears!', "You didn't even need the whole intro!"] },
  { minPoints: 20, messages: ['Sharp! You know your fight songs.', 'Great ear — nicely done.', 'That was quick. Impressive!'] },
  { minPoints: 10, messages: ['Solid call!', 'Nice work — you nailed the school.', 'Good instincts on that one.'] },
  { minPoints: 5, messages: ['Got there in the end — well played!', 'Every point counts. Nice save!', 'Down to the wire, but correct!'] },
  { minPoints: 0, messages: ['Buzzer-beater! 🏈', 'Just in time!', 'Cutting it close, but you made it!'] },
];

const getFeedbackMessage = (points) => {
  for (const tier of FEEDBACK_TIERS) {
    if (points >= tier.minPoints) {
      return tier.messages[Math.floor(Math.random() * tier.messages.length)];
    }
  }
  return '';
};

const MAX_ROUNDS = 10;
// Each round: 1 correct + 1 familiar (fight-song pool) + 2 lesser-known = 4 options.
const FAMILIAR_DISTRACTORS = 1;
const UNFAMILIAR_DISTRACTORS = 2;
// Three tiered clues per round, revealed one after another: colors → song → mascot.
const CLUES_PER_ROUND = 3;

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickRandom = (arr, n) => shuffle(arr).slice(0, n);

const useNameThatCollege = () => {
  const [gameState, setGameState] = useState('idle'); // idle | playing | revealed | finished

  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(MAX_ROUNDS);
  const [score, setScore] = useState(0);
  const [currentSong, setCurrentSong] = useState(null); // correct answer for the round
  const [options, setOptions] = useState([]);           // 4 song objects (one correct)
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // ── Clue system: 3 tiered clues per round, revealed one after another.
  //    Tracks how many are currently shown (0..CLUES_PER_ROUND). ──
  const [cluesRevealed, setCluesRevealed] = useState(0);

  // ── Time-based scoring ──
  const [roundPoints, setRoundPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [roundElapsed, setRoundElapsed] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [hasListened, setHasListened] = useState(false);
  const roundStartTime = useRef(null);
  const roundTimerStarted = useRef(false);

  const usedSongIds = useRef(new Set());

  const generateRound = useCallback((pool) => {
    const available = pool.filter((s) => !usedSongIds.current.has(s.id));
    if (available.length < 1) return null;

    const correct = available[Math.floor(Math.random() * available.length)];
    usedSongIds.current.add(correct.id);

    // Options are generic choices: { id, college }. The correct choice keeps the
    // song's numeric id so answer-checking (id === currentSong.id) still works.
    const usedColleges = new Set([correct.college]);

    // 1 FAMILIAR distractor — another marquee school from the fight-song pool.
    const familiarPool = COLLEGE_SONGS.filter(
      (s) => s.id !== correct.id && !usedColleges.has(s.college)
    );
    const familiar = pickRandom(familiarPool, FAMILIAR_DISTRACTORS).map((s) => {
      usedColleges.add(s.college);
      return { id: s.id, college: s.college };
    });

    // 2 more distractors — other REAL football programs, so every wrong option
    // is still a plausible football school (no obvious non-football giveaways).
    const footballPool = OTHER_FOOTBALL_COLLEGES.filter((c) => !usedColleges.has(c));
    const others = pickRandom(footballPool, UNFAMILIAR_DISTRACTORS).map((c) => {
      usedColleges.add(c);
      return { id: `fb-${c}`, college: c };
    });

    const roundOptions = shuffle([
      { id: correct.id, college: correct.college },
      ...familiar,
      ...others,
    ]);

    return { correct, options: roundOptions };
  }, []);

  const useClue = useCallback(() => {
    if (gameState !== 'playing') return;
    if (cluesRevealed >= CLUES_PER_ROUND) return; // all clues already shown
    setCluesRevealed((prev) => prev + 1);
  }, [gameState, cluesRevealed]);

  const startRoundTimer = useCallback(() => {
    if (roundTimerStarted.current) return;
    roundStartTime.current = Date.now();
    roundTimerStarted.current = true;
    setHasListened(true);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setCurrentRound(0);
    setSelectedOptionId(null);
    setIsCorrect(null);
    setCluesRevealed(0);
    setRoundPoints(0);
    setTotalPoints(0);
    setRoundElapsed(0);
    setFeedbackMessage('');
    setHasListened(false);
    roundStartTime.current = null;
    roundTimerStarted.current = false;
    usedSongIds.current.clear();

    const pool = COLLEGE_SONGS;
    const rounds = Math.min(pool.length, MAX_ROUNDS);
    setTotalRounds(rounds);

    const round = generateRound(pool);
    if (!round) {
      setGameState('finished');
      return;
    }
    setCurrentSong(round.correct);
    setOptions(round.options);
    setCurrentRound(1);
    setGameState('playing');
  }, [generateRound]);

  const selectAnswer = useCallback((songId) => {
    if (gameState !== 'playing') return;
    if (selectedOptionId !== null) return;
    if (!hasListened) return;

    const correct = songId === currentSong?.id;
    setSelectedOptionId(songId);
    setIsCorrect(correct);

    const elapsed = roundStartTime.current
      ? (Date.now() - roundStartTime.current) / 1000
      : 60;
    setRoundElapsed(Math.round(elapsed * 10) / 10);

    if (correct) {
      const pts = getPointsForTime(elapsed);
      setRoundPoints(pts);
      setTotalPoints((prev) => prev + pts);
      setScore((prev) => prev + 1);
      setFeedbackMessage(getFeedbackMessage(pts));
    } else {
      setRoundPoints(0);
      setFeedbackMessage('');
    }

    setGameState('revealed');
  }, [gameState, selectedOptionId, currentSong, hasListened]);

  const nextRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      setGameState('finished');
      return;
    }
    setSelectedOptionId(null);
    setIsCorrect(null);
    setCluesRevealed(0);
    setRoundPoints(0);
    setRoundElapsed(0);
    setFeedbackMessage('');
    setHasListened(false);
    roundStartTime.current = null;
    roundTimerStarted.current = false;

    const round = generateRound(COLLEGE_SONGS);
    if (!round) {
      setGameState('finished');
      return;
    }
    setCurrentSong(round.correct);
    setOptions(round.options);
    setCurrentRound((prev) => prev + 1);
    setGameState('playing');
  }, [currentRound, totalRounds, generateRound]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setCurrentRound(0);
    setScore(0);
    setCurrentSong(null);
    setOptions([]);
    setSelectedOptionId(null);
    setIsCorrect(null);
    setCluesRevealed(0);
    setRoundPoints(0);
    setTotalPoints(0);
    setRoundElapsed(0);
    setFeedbackMessage('');
    setHasListened(false);
    roundStartTime.current = null;
    roundTimerStarted.current = false;
    usedSongIds.current.clear();
  }, []);

  return {
    gameState,
    currentRound,
    totalRounds,
    score,
    currentSong,
    options,
    selectedOptionId,
    isCorrect,
    cluesRevealed,
    totalClues: CLUES_PER_ROUND,
    hasListened,
    roundPoints,
    totalPoints,
    roundElapsed,
    feedbackMessage,
    startGame,
    selectAnswer,
    nextRound,
    resetGame,
    useClue,
    startRoundTimer,
  };
};

export default useNameThatCollege;
