// ============================================================================
// useNameThatTune.js — Game State Machine
// ============================================================================
//
// Manages: rounds, scoring, option generation, answer checking, progression.
// Does NOT manage: audio playback (that's useAudioPlayer's job).
// Does NOT manage: UI rendering (that's NameThatTune.jsx's job).
//
// Game flow:
//   IDLE → startGame() → PLAYING
//   PLAYING: user sees "Listen" btn → clicks → audio plays → picks option
//   → REVEALED (show correct/wrong) → "Next Round" → PLAYING (next tune)
//   → after N rounds → FINISHED (show final score)
//
// ============================================================================

import { useState, useCallback, useRef } from 'react';
import { TUNES } from './nameThatTuneData';

// ── Time-based point thresholds ──
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
    return 1; // > 30 seconds still gets 1 point
};

// ── Performance feedback messages (only shown for correct answers) ──
const FEEDBACK_TIERS = [
    {
        minPoints: 40,
        messages: [
            "Lightning fast! ⚡️ You're in the zone!",
            "Sonic speed! Perfect reaction time.",
            "Absolute pro! You didn't even blink.",
        ],
    },
    {
        minPoints: 20,
        messages: [
            "Impressive! You've got great reflexes.",
            "Sharp as a tack! Keep that momentum going.",
            "Great pace! You're crushing it.",
        ],
    },
    {
        minPoints: 10,
        messages: [
            "Nice work! Steady and correct.",
            "Solid performance. You've got this!",
            "Good eye! You're making it look easy.",
        ],
    },
    {
        minPoints: 5,
        messages: [
            "Calculated and correct! Nice job.",
            "Way to stay focused. Every point counts!",
            "Slow and steady wins the race. Well done!",
        ],
    },
    {
        minPoints: 0,
        messages: [
            "Phew! Just in time! ⏱",
            "Talk about a buzzer beater! Great job getting it in.",
            "Persistence pays off. You made it!",
        ],
    },
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
const OPTIONS_PER_ROUND = 4;

/**
 * Fisher-Yates shuffle (non-mutating).
 */
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

/**
 * Pick N random items from arr (without replacement).
 */
const pickRandom = (arr, n) => shuffle(arr).slice(0, n);

/**
 * Game states:
 *   'idle'     — initial, before game starts
 *   'playing'  — a round is active, user hasn't answered yet
 *   'revealed' — user answered, showing correct/incorrect feedback
 *   'finished' — all rounds complete, showing final score
 */

const useNameThatTune = () => {
    const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'revealed' | 'finished'

    const [currentRound, setCurrentRound] = useState(0);
    const [totalRounds, setTotalRounds] = useState(MAX_ROUNDS);
    const [score, setScore] = useState(0);
    const [currentTune, setCurrentTune] = useState(null);       // The correct tune for this round
    const [options, setOptions] = useState([]);                  // 4 tune objects (shuffled, includes correct)
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);           // null | true | false

    // ── Clue system state ──
    const [cluesRemaining, setCluesRemaining] = useState(3);     // Game-wide budget
    const [revealedClues, setRevealedClues] = useState([]);       // Clues shown this round

    // ── Time-based point system state ──
    const [roundPoints, setRoundPoints] = useState(0);            // Points earned this round
    const [totalPoints, setTotalPoints] = useState(0);            // Cumulative points
    const [roundElapsed, setRoundElapsed] = useState(0);          // Seconds taken this round
    const [feedbackMessage, setFeedbackMessage] = useState('');   // Tier feedback text
    const [hasListened, setHasListened] = useState(false);         // True after first Listen press
    const roundStartTime = useRef(null);                          // Timer start timestamp
    const roundTimerStarted = useRef(false);                      // Guard: only start once per round

    // Track which tunes have been used this game to avoid repeats
    const usedTuneIds = useRef(new Set());

    /**
     * Generate a new round: pick a correct tune + 3 distractors.
     */
    const generateRound = useCallback((pool) => {
        // Filter out already-used tunes
        const available = pool.filter(t => !usedTuneIds.current.has(t.id));

        if (available.length < 1) {
            // Exhausted the pool — game should end
            return null;
        }

        // Pick the correct answer
        const correct = available[Math.floor(Math.random() * available.length)];
        usedTuneIds.current.add(correct.id);

        // Pick distractors from the FULL library (excluding correct)
        // This ensures we always have 4 options even if the pool is small
        const distractorPool = TUNES.filter(t => t.id !== correct.id);
        const distractors = pickRandom(distractorPool, OPTIONS_PER_ROUND - 1);

        // Combine & shuffle
        const roundOptions = shuffle([correct, ...distractors]);

        return { correct, options: roundOptions };
    }, []);

    /**
     * Use a clue for the current round.
     * Guards: must be playing, must have budget, max 1 per round, clue must exist.
     */
    const useClue = useCallback(() => {
        if (gameState !== 'playing') return;
        if (cluesRemaining <= 0) return;

        const clues = currentTune?.clues;
        if (!clues || !clues[revealedClues.length]) return; // Safe guard for missing/short clues

        setRevealedClues(prev => [...prev, clues[prev.length]]);
        setCluesRemaining(prev => prev - 1);
    }, [gameState, cluesRemaining, currentTune, revealedClues.length]);

    /**
     * Start the round timer. Called once per round when the user first presses Play.
     */
    const startRoundTimer = useCallback(() => {
        if (roundTimerStarted.current) return; // Already started this round
        roundStartTime.current = Date.now();
        roundTimerStarted.current = true;
        setHasListened(true);
    }, []);

    /**
     * Start a new game.
     */
    const startGame = useCallback(() => {
        setScore(0);
        setCurrentRound(0);
        setSelectedOptionId(null);
        setIsCorrect(null);
        setCluesRemaining(3);
        setRevealedClues([]);
        setRoundPoints(0);
        setTotalPoints(0);
        setRoundElapsed(0);
        setFeedbackMessage('');
        setHasListened(false);
        roundStartTime.current = null;
        roundTimerStarted.current = false;
        usedTuneIds.current.clear();

        const pool = TUNES;
        // Dynamically set rounds based on how many tunes are available
        const rounds = Math.min(pool.length, MAX_ROUNDS);
        setTotalRounds(rounds);

        const round = generateRound(pool);

        if (!round) {
            setGameState('finished');
            return;
        }

        setCurrentTune(round.correct);
        setOptions(round.options);
        setCurrentRound(1);
        setGameState('playing');
    }, [generateRound]);

    /**
     * User selects an answer.
     */
    const selectAnswer = useCallback((tuneId) => {
        if (gameState !== 'playing') return; // Guard against double-clicks
        if (selectedOptionId !== null) return; // Already answered this round
        if (!hasListened) return;              // Must listen before answering

        const correct = tuneId === currentTune?.id;
        setSelectedOptionId(tuneId);
        setIsCorrect(correct);

        // ── Time-based scoring ──
        const elapsed = roundStartTime.current
            ? (Date.now() - roundStartTime.current) / 1000
            : 30; // Fallback if timer wasn't started
        setRoundElapsed(Math.round(elapsed * 10) / 10); // 1 decimal place

        if (correct) {
            const pts = getPointsForTime(elapsed);
            setRoundPoints(pts);
            setTotalPoints(prev => prev + pts);
            setScore(prev => prev + 1);
            setFeedbackMessage(getFeedbackMessage(pts));
        } else {
            setRoundPoints(0);
            setFeedbackMessage('');
        }

        setGameState('revealed');
    }, [gameState, selectedOptionId, currentTune, hasListened]);

    /**
     * Advance to the next round (called after user sees feedback).
     */
    const nextRound = useCallback(() => {
        if (currentRound >= totalRounds) {
            setGameState('finished');
            return;
        }

        setSelectedOptionId(null);
        setIsCorrect(null);
        setRevealedClues([]);
        setRoundPoints(0);
        setRoundElapsed(0);
        setFeedbackMessage('');
        setHasListened(false);
        roundStartTime.current = null;
        roundTimerStarted.current = false;

        const pool = TUNES;
        const round = generateRound(pool);

        if (!round) {
            setGameState('finished');
            return;
        }

        setCurrentTune(round.correct);
        setOptions(round.options);
        setCurrentRound(prev => prev + 1);
        setGameState('playing');
    }, [currentRound, totalRounds, generateRound]);

    /**
     * Reset to idle state.
     */
    const resetGame = useCallback(() => {
        setGameState('idle');
        setCurrentRound(0);
        setScore(0);
        setCurrentTune(null);
        setOptions([]);
        setSelectedOptionId(null);
        setIsCorrect(null);
        setCluesRemaining(3);
        setRevealedClues([]);
        setRoundPoints(0);
        setTotalPoints(0);
        setRoundElapsed(0);
        setFeedbackMessage('');
        setHasListened(false);
        roundStartTime.current = null;
        roundTimerStarted.current = false;
        usedTuneIds.current.clear();
    }, []);

    return {
        // State
        gameState,
        currentRound,
        totalRounds,
        score,
        currentTune,
        options,
        selectedOptionId,
        isCorrect,

        // Clue state
        cluesRemaining,
        revealedClues,

        // Point system state
        hasListened,
        roundPoints,
        totalPoints,
        roundElapsed,
        feedbackMessage,

        // Actions
        startGame,
        selectAnswer,
        nextRound,
        resetGame,
        useClue,
        startRoundTimer,
    };
};

export default useNameThatTune;

