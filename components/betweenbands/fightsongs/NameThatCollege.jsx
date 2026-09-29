'use client';
// ============================================================================
// NameThatCollege.jsx — hear a college fight song, name the school
// ============================================================================
// Reuses the Name That Tune look (ntt-* classes) for a consistent feel.
// Audio is YouTube-backed (useYouTubePlayer) and capped at ~1 minute.
// ============================================================================

import React, { useEffect, useState, useRef, useMemo } from 'react';
import useYouTubePlayer from './useYouTubePlayer';
import useNameThatCollege from './useNameThatCollege';
import { obfuscateSongName } from './fightSongsData';

// The three tiered clues for a round, revealed one after another.
const buildClues = (song) => {
  if (!song) return [];
  return [
    { label: 'Team colors', value: song.colors },
    { label: 'Song title', value: obfuscateSongName(song.song) },
    { label: 'Mascot', value: song.mascot },
  ];
};

const CELEBRATION_EMOJIS = ['🎺', '🏈', '🎶', '🥁', '🎺', '🏈', '🎶', '🥁'];

const generateCelebrationNotes = () =>
  Array.from({ length: 25 }, (_, i) => ({
    id: i,
    emoji: CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length],
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 1.5}s`,
    animationDuration: `${2 + Math.random() * 1}s`,
  }));

const NameThatCollege = () => {
  const audio = useYouTubePlayer({ clipSeconds: 60 });
  const game = useNameThatCollege();

  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationTimer = useRef(null);
  const celebrationNotes = useMemo(() => generateCelebrationNotes(), []);

  const [showRules, setShowRules] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  // Load the current song's audio when the round changes.
  useEffect(() => {
    if (game.currentSong?.youtubeId) {
      audio.loadTrack(game.currentSong.youtubeId);
    }
  }, [game.currentSong?.youtubeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stop audio once the round is revealed.
  useEffect(() => {
    if (game.gameState === 'revealed') {
      audio.stop();
    }
  }, [game.gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Celebration on a perfect game.
  useEffect(() => {
    if (game.gameState === 'finished' && game.score === game.totalRounds) {
      setShowCelebration(true);
      celebrationTimer.current = setTimeout(() => setShowCelebration(false), 3000);
    }
    return () => {
      if (celebrationTimer.current) {
        clearTimeout(celebrationTimer.current);
        celebrationTimer.current = null;
      }
    };
  }, [game.gameState, game.score, game.totalRounds]);

  const handlePlay = () => {
    if (audio.isPlaying) {
      audio.pause();
    } else {
      game.startRoundTimer();
      audio.play();
    }
  };

  const getOptionClass = (option) => {
    if (game.gameState !== 'revealed') return 'ntt-option-btn';
    if (option.id === game.currentSong?.id) return 'ntt-option-btn ntt-correct';
    if (option.id === game.selectedOptionId) return 'ntt-option-btn ntt-wrong';
    return 'ntt-option-btn ntt-disabled';
  };

  const clues = buildClues(game.currentSong);
  const cluesLeft = game.totalClues - game.cluesRevealed;
  const clueDisabled = cluesLeft <= 0 || game.gameState === 'revealed';

  // ─── IDLE ───
  if (game.gameState === 'idle') {
    return (
      <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-college.png')" }}>
        <div className="ntt-overlay">
          <div className="ntt-game-box">
            <div ref={audio.hostRef} aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />
            <h1 className="ntt-title">🏈 Name That College</h1>
            <p className="ntt-description">
              Listen to a college fight song and guess which school it belongs to!
              10 rounds. Stuck? Reveal up to 3 clues &mdash; team colors, the song
              title, then the mascot.
            </p>
            <button className="ntt-listen-btn" onClick={() => game.startGame()}>
              🎺 Start Game
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
                <li>The game consists of <strong>10 rounds</strong> of famous college fight songs.</li>
                <li>Hit <strong>"Listen to Fight Song"</strong> to start the timer and hear the tune.</li>
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
                <li>Use a <strong>Clue (💡)</strong> if you're stuck (max 3 per game). We reveal one clue at a time: team colors, song title, then the mascot!</li>
              </ul>
              <button className="ntt-listen-btn" onClick={() => setShowRules(false)}>Got it!</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── FINISHED ───
  if (game.gameState === 'finished') {
    const pct = Math.round((game.score / game.totalRounds) * 100);
    const maxPoints = game.totalRounds * 50;
    let message = '';
    let emoji = '';
    if (pct >= 90) { message = 'Fight song fanatic!'; emoji = '🏆'; }
    else if (pct >= 70) { message = 'Drum major of trivia!'; emoji = '🎺'; }
    else if (pct >= 50) { message = 'Solid tailgater!'; emoji = '🏈'; }
    else { message = 'Time to brush up on the classics!'; emoji = '📻'; }

    return (
      <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-college.png')" }}>
        <div className="ntt-overlay">
          <div className="ntt-game-box">
            <div ref={audio.hostRef} aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />
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

        {showCelebration && (
          <div className="ntt-celebration-container" aria-hidden="true">
            {celebrationNotes.map((note) => (
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

  // ─── PLAYING / REVEALED ───
  return (
    <div className="ntt-page-container" style={{ backgroundImage: "url('/entertainment/games/Name-that-college.png')" }}>
      <div className="ntt-overlay">
        <div className="ntt-game-box">
          <div ref={audio.hostRef} aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />

          <div className="ntt-header">
            <span className="ntt-round">Round {game.currentRound}/{game.totalRounds}</span>
            <div className="ntt-header-right">
              <span className="ntt-timer">⏱ {elapsedTime}s</span>
              <span className="ntt-score">Points: {game.totalPoints}</span>
              <button className="ntt-rules-btn-small" onClick={() => setShowRules(true)}>📜</button>
            </div>
          </div>

          <h1 className="ntt-title">Which college&rsquo;s fight song is this?</h1>

          {/* Audio */}
          <div className="ntt-listen-section">
            <button
              className={`ntt-listen-btn ${audio.isPlaying ? 'ntt-playing' : ''}`}
              onClick={handlePlay}
              disabled={game.gameState === 'revealed'}
            >
              {audio.isLoading ? '⏳ Loading...' :
                audio.isPlaying ? '⏸ Pause' :
                  '▶ Listen to Fight Song'}
            </button>

            {(audio.isPlaying || audio.progress > 0) && (
              <div className="ntt-progress-bar">
                <div className="ntt-progress-fill" style={{ width: `${audio.progress * 100}%` }} />
              </div>
            )}

            {audio.error && <p className="ntt-audio-error">{audio.error}</p>}

            <button
              className="ntt-clue-button"
              onClick={game.useClue}
              disabled={clueDisabled}
              aria-disabled={clueDisabled}
            >
              {game.cluesRevealed === 0
                ? `💡 Reveal a Clue (${cluesLeft})`
                : cluesLeft > 0
                  ? `💡 Next Clue (${cluesLeft} left)`
                  : '💡 No more clues'}
            </button>

            {game.cluesRevealed > 0 && (
              <div className="ntt-clue-box">
                {clues.slice(0, game.cluesRevealed).map((clue, idx) => (
                  <p key={idx} className="ntt-clue">
                    <strong>{clue.label}:</strong>{' '}
                    {clue.label === 'Song title' ? `“${clue.value}”` : clue.value}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* College options */}
          <div className="ntt-options-grid">
            {game.options.map((option) => (
              <button
                key={option.id}
                className={getOptionClass(option)}
                onClick={() => game.selectAnswer(option.id)}
                disabled={game.gameState === 'revealed' || !game.hasListened}
              >
                {option.college}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Result modal — reveals the correct college's logo (right or wrong).
          Closing it advances to the next song. */}
      {game.gameState === 'revealed' && game.currentSong && (
        <div
          className="ntc-result-overlay"
          role="dialog"
          aria-modal="true"
          onClick={game.nextRound}
        >
          <div className="ntc-result-card" onClick={(e) => e.stopPropagation()}>
            <button className="ntc-result-close" onClick={game.nextRound} aria-label="Close">
              ✕
            </button>

            <p className={`ntt-feedback-text ${game.isCorrect ? 'ntt-text-correct' : 'ntt-text-wrong'}`}>
              {game.isCorrect ? '✅ Correct!' : '❌ Not quite!'}
            </p>

            <img
              className="ntc-result-logo"
              src={`/entertainment/images/college-logos/${game.currentSong.id}.png`}
              alt={`${game.currentSong.college} logo`}
            />

            <h2 className="ntc-result-college">{game.currentSong.college}</h2>
            <p className="ntc-result-song">🎵 &ldquo;{game.currentSong.song}&rdquo;</p>

            {game.isCorrect && (
              <div className="ntt-points-result">
                <span className="ntt-points-badge">+{game.roundPoints} pts</span>
                <span className="ntt-elapsed">in {game.roundElapsed}s</span>
              </div>
            )}
            {game.isCorrect && game.feedbackMessage && (
              <p className="ntt-speed-feedback">{game.feedbackMessage}</p>
            )}

            <button className="ntt-listen-btn ntt-next-btn" onClick={game.nextRound}>
              {game.currentRound >= game.totalRounds ? 'See Results →' : 'Next Round →'}
            </button>
          </div>
        </div>
      )}
      
      {showRules && (
        <div className="ntt-modal-overlay">
          <div className="ntt-modal-content">
            <h2>📜 Game Rules</h2>
            <ul className="ntt-rules-list">
              <li>The game consists of <strong>10 rounds</strong> of famous college fight songs.</li>
              <li>Hit <strong>"Listen to Fight Song"</strong> to start the timer and hear the tune.</li>
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
              <li>Use a <strong>Clue (💡)</strong> if you're stuck (max 3 per game). We reveal one clue at a time: team colors, song title, then the mascot!</li>
            </ul>
            <button className="ntt-listen-btn" onClick={() => setShowRules(false)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameThatCollege;
