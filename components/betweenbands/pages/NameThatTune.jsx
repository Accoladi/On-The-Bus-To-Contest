'use client';
import React, { useEffect, useState, useRef } from 'react';
import useAudioPlayer from '../ntt/useAudioPlayer';
import useNameThatTune from '../ntt/useNameThatTune';

// ── Celebration note generator (pure function, called once via useMemo) ──
const CELEBRATION_EMOJIS = ['🎵', '🎶', '🎺', '🎵', '🎶', '🎺', '🎵', '🎶'];

const generateCelebrationNotes = (count = 25) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length],
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1.5}s`,
        animationDuration: `${2 + Math.random() * 1}s`,
    }));

const NameThatTune = () => {
    const audio = useAudioPlayer();
    const game = useNameThatTune();

    // ── Celebration state ──
    const [showCelebration, setShowCelebration] = useState(false);
    const celebrationTimer = useRef(null);
    const [celebrationNotes, setCelebrationNotes] = useState([]);

    // ── Rules & Timer state ──
    const [showRules, setShowRules] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'game_start',
            game_id: 'name_that_tune',
            game_title: 'Name That Tune'
        });
    }, []);

    useEffect(() => {
        if (game.gameState === 'finished') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'game_complete',
                game_id: 'name_that_tune',
                game_title: 'Name That Tune',
                score: game.totalPoints,
                success: true
            });
        }
    }, [game.gameState, game.totalPoints]);

    // Timer effect for live counting
    useEffect(() => {
        let interval = null;
        if (game.gameState === 'playing' && game.hasListened) {
            const start = Date.now();
            interval = setInterval(() => {
                setElapsedTime(Math.max(0, (Date.now() - start) / 1000).toFixed(1));
            }, 100);
        } else if (game.gameState === 'revealed') {
            setElapsedTime(game.roundElapsed.toFixed(1));
        } else if (game.gameState === 'idle') {
            setElapsedTime(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [game.gameState, game.hasListened, game.roundElapsed]);

    // When the current tune changes, load the audio
    useEffect(() => {
        if (game.currentTune?.src) {
            audio.loadTrack(game.currentTune.src);
        }
    }, [game.currentTune?.src]); // eslint-disable-line react-hooks/exhaustive-deps

    // Stop audio when round is revealed (user answered)
    useEffect(() => {
        if (game.gameState === 'revealed') {
            audio.stop();
        }
    }, [game.gameState]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Celebration trigger (state-transition based) ──
    useEffect(() => {
        if (game.gameState === 'finished' && game.totalPoints >= 400) {
            setCelebrationNotes(generateCelebrationNotes(75)); // Big celebration
            setShowCelebration(true);
            celebrationTimer.current = setTimeout(() => setShowCelebration(false), 5000);
        } else if (game.gameState === 'revealed' && game.isCorrect && game.roundElapsed <= 10) {
            setCelebrationNotes(generateCelebrationNotes(30)); // Small celebration
            setShowCelebration(true);
            celebrationTimer.current = setTimeout(() => setShowCelebration(false), 2500);
        } else {
            setShowCelebration(false);
        }
        return () => {
            if (celebrationTimer.current) {
                clearTimeout(celebrationTimer.current);
                celebrationTimer.current = null;
            }
        };
    }, [game.gameState, game.totalPoints, game.isCorrect, game.roundElapsed]);

    const handlePlay = () => {
        if (audio.isPlaying) {
            audio.pause();
        } else {
            game.startRoundTimer(); // Start timer on first play per round
            audio.play();
        }
    };

    const handleAnswer = (tuneId) => {
        game.selectAnswer(tuneId);
    };

    const handleNext = () => {
        game.nextRound();
    };

    const getOptionClass = (option) => {
        if (game.gameState !== 'revealed') return 'ntt-option-btn';
        if (option.id === game.currentTune?.id) return 'ntt-option-btn ntt-correct';
        if (option.id === game.selectedOptionId) return 'ntt-option-btn ntt-wrong';
        return 'ntt-option-btn ntt-disabled';
    };

    const clueDisabled =
        game.cluesRemaining <= 0 ||
        game.gameState === 'revealed';

    // ─── IDLE SCREEN ───
    if (game.gameState === 'idle') {
        return (
            <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-tune-responsive.png')" }}>
                <div className="ntt-overlay">
                    <div className="ntt-game-box">
                        <h1 className="ntt-title">🎵 Name That Marching Band Tune</h1>
                        <p className="ntt-description">
                            Listen to a short marching band clip and identify the tune!
                            10 rounds. How well do you know your stand tunes?
                        </p>

                        <button className="ntt-listen-btn" onClick={() => game.startGame()}>
                            🎶 Start Game
                        </button>
                        <button className="ntt-listen-btn ntt-rules-btn-idle" onClick={() => setShowRules(true)}>
                            📜 How to Play (Rules)
                        </button>
                    </div>
                </div>
                {showRules && (
                    <div className="ntt-modal-overlay">
                        <div className="ntt-modal-content">
                            <h2>📜 Game Rules</h2>
                            <ul className="ntt-rules-list">
                                <li>The game consists of <strong>10 rounds</strong> of short marching band clips.</li>
                                <li>Hit <strong>"Listen"</strong> to start the timer and hear the tune.</li>
                                <li><strong>Faster answers = More points!</strong>
                                    <ul>
                                        <li>&lt; 3 seconds: 50 points</li>
                                        <li>&lt; 5 seconds: 30 points</li>
                                        <li>&lt; 10 seconds: 20 points</li>
                                        <li>&lt; 20 seconds: 10 points</li>
                                        <li>&lt; 30 seconds: 5 points</li>
                                        <li>&gt; 30 seconds: 1 point</li>
                                    </ul>
                                </li>
                                <li>Use a <strong>Clue (💡)</strong> if you're stuck (max 3 per game).</li>
                            </ul>
                            <button className="ntt-listen-btn" onClick={() => setShowRules(false)}>Got it!</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ─── GAME OVER SCREEN ───
    if (game.gameState === 'finished') {
        const pct = Math.round((game.score / game.totalRounds) * 100);
        const maxPoints = game.totalRounds * 50;
        let message = '';
        let emoji = '';
        if (pct >= 90) { message = 'Band Director material!'; emoji = '🏆'; }
        else if (pct >= 70) { message = 'Section leader vibes!'; emoji = '🎺'; }
        else if (pct >= 50) { message = 'Solid marcher!'; emoji = '🥁'; }
        else { message = 'Keep practicing those stand tunes!'; emoji = '📖'; }

        return (
            <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-tune-responsive.png')" }}>
                <div className="ntt-overlay">
                    <div className="ntt-game-box">
                        <h1 className="ntt-title">Game Over!</h1>
                        <div className="ntt-final-score">
                            <span className="ntt-final-emoji">{emoji}</span>
                            <p className="ntt-final-number">{game.score} / {game.totalRounds}</p>
                            <p className="ntt-final-pct">{pct}%</p>
                            <p className="ntt-final-points">{game.totalPoints} / {maxPoints} Points</p>
                            <p className="ntt-final-message">{message}</p>
                        </div>
                        <button className="ntt-listen-btn" onClick={game.resetGame}>
                            Play Again
                        </button>
                    </div>
                </div>

                {/* Celebration overlay */}
                {showCelebration && (
                    <div className="ntt-celebration-container" aria-hidden="true">
                        {celebrationNotes.map(note => (
                            <span
                                key={note.id}
                                className="ntt-celebration-note"
                                style={{
                                    left: note.left,
                                    animationDelay: note.animationDelay,
                                    animationDuration: note.animationDuration,
                                }}
                            >
                                {note.emoji}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ─── PLAYING / REVEALED SCREEN ───
    return (
        <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-tune-responsive.png')" }}>
            <div className="ntt-overlay">
                <div className="ntt-game-box">
                    <div className="ntt-header">
                        <span className="ntt-round">Round {game.currentRound}/{game.totalRounds}</span>
                        <div className="ntt-header-right">
                            <span className="ntt-timer">⏱ {elapsedTime}s</span>
                            <span className="ntt-score">Points: {game.totalPoints}</span>
                            <button className="ntt-rules-btn-small" onClick={() => setShowRules(true)}>📜</button>
                        </div>
                    </div>

                    <h1 className="ntt-title">Name That Marching Band Tune!</h1>

                    {/* Audio Player Section */}
                    <div className="ntt-listen-section">
                        <button
                            className={`ntt-listen-btn ${audio.isPlaying ? 'ntt-playing' : ''}`}
                            onClick={handlePlay}
                            disabled={game.gameState === 'revealed'}
                        >
                            {audio.isLoading ? '⏳ Loading...' :
                                audio.isPlaying ? '⏸ Pause' :
                                    '▶ Listen to Tune'}
                        </button>

                        {/* Progress bar */}
                        {(audio.isPlaying || audio.progress > 0) && (
                            <div className="ntt-progress-bar">
                                <div
                                    className="ntt-progress-fill"
                                    style={{ width: `${audio.progress * 100}%` }}
                                />
                            </div>
                        )}

                        {audio.error && (
                            <p className="ntt-audio-error">{audio.error}</p>
                        )}

                        {/* Clue Button */}
                        <button
                            className="ntt-clue-button"
                            onClick={game.useClue}
                            disabled={clueDisabled}
                            aria-disabled={clueDisabled}
                        >
                            💡 Use Clue ({game.cluesRemaining})
                        </button>

                        {/* Revealed Clues */}
                        {game.revealedClues.length > 0 && (
                            <div className="ntt-clue-box">
                                {game.revealedClues.map((clue, idx) => (
                                    <p key={idx} className="ntt-clue">{clue}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Answer Options */}
                    <div className="ntt-options-grid">
                        {game.options.map((option) => (
                            <button
                                key={option.id}
                                className={getOptionClass(option)}
                                onClick={() => handleAnswer(option.id)}
                                disabled={game.gameState === 'revealed' || !game.hasListened}
                            >
                                {option.title}
                            </button>
                        ))}
                    </div>

                    {/* Revealed feedback */}
                    {game.gameState === 'revealed' && (
                        <div className="ntt-feedback">
                            <p className={`ntt-feedback-text ${game.isCorrect ? 'ntt-text-correct' : 'ntt-text-wrong'}`}>
                                {game.isCorrect ? '✅ Correct!' : `❌ Wrong! It was "${game.currentTune?.title}"`}
                            </p>

                            {/* Points badge & speed feedback (correct answers only) */}
                            {game.isCorrect && (
                                <div className="ntt-points-result">
                                    <span className="ntt-points-badge">+{game.roundPoints} pts</span>
                                    <span className="ntt-elapsed">in {game.roundElapsed}s</span>
                                    {game.feedbackMessage && (
                                        <p className="ntt-speed-feedback">{game.feedbackMessage}</p>
                                    )}
                                </div>
                            )}

                            <button className="ntt-listen-btn ntt-next-btn" onClick={handleNext}>
                                {game.currentRound >= game.totalRounds ? 'See Results' : 'Next Round →'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showRules && (
                <div className="ntt-modal-overlay">
                    <div className="ntt-modal-content">
                        <h2>📜 Game Rules</h2>
                        <ul className="ntt-rules-list">
                            <li>The game consists of <strong>10 rounds</strong> of short marching band clips.</li>
                            <li>Hit <strong>"Listen"</strong> to start the timer and hear the tune.</li>
                            <li><strong>Faster answers = More points!</strong>
                                <ul>
                                    <li>&lt; 3 seconds: 50 points</li>
                                    <li>&lt; 5 seconds: 30 points</li>
                                    <li>&lt; 10 seconds: 20 points</li>
                                    <li>&lt; 20 seconds: 10 points</li>
                                    <li>&lt; 30 seconds: 5 points</li>
                                    <li>&gt; 30 seconds: 1 point</li>
                                </ul>
                            </li>
                            <li>Use a <strong>Clue (💡)</strong> if you're stuck (max 3 per game).</li>
                        </ul>
                        <button className="ntt-listen-btn" onClick={() => setShowRules(false)}>Got it!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NameThatTune;
