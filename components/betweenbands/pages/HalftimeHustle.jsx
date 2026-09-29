import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import HalftimeHustleGame from '../runner/engine/game';

// ─── The Dodging Judge — 3D endless runner ──────────────────────────────────
export default function HalftimeHustle() {
    const hostRef = useRef(null);
    const gameRef = useRef(null);
    const [state, setState] = useState('ready'); // 'ready' | 'playing' | 'over' | 'unsupported'
    const [score, setScore] = useState(0);
    const [notes, setNotes] = useState(0);
    const [meter, setMeter] = useState(0);       // 0..1 Song Meter fill
    const [song, setSong] = useState(null);      // marching tune title, or null

    useEffect(() => {
        let game;
        try {
            game = new HalftimeHustleGame(hostRef.current, {
                onScore: setScore,
                onState: setState,
                onNotes: setNotes,
                onMeter: setMeter,
                onSong: setSong,
            });
        } catch (err) {
            // Most commonly a WebGL context failure (disabled hardware acceleration,
            // aggressive privacy/fingerprinting protection, sandboxed GPU, etc.) —
            // fail into a friendly message instead of crashing the whole app.
            console.error('The Dodging Judge failed to start:', err);
            setState('unsupported');
            return;
        }
        gameRef.current = game;
        return () => {
            game.dispose();
            gameRef.current = null;
        };
    }, []);

    const handleStart = () => gameRef.current?.start();

    return (
        <div className="hh-page">
            <div className="hh-stage">
                {/* Three.js mounts its canvas here */}
                <div className="hh-canvas-host" ref={hostRef} />

                {/* HUD */}
                {state === 'playing' && (
                    <>
                        <div className="hh-hud">
                            <div className="hh-score">
                                <span className="hh-score-label">Yards</span>
                                <span className="hh-score-value">{score}</span>
                            </div>
                            <div className="hh-notes">
                                <span className="hh-notes-icon">🎵</span>
                                <span className="hh-notes-value">{notes}</span>
                            </div>
                        </div>

                        {/* Song Meter */}
                        <div className="hh-meter-wrap">
                            <div className="hh-meter-label">Song Meter</div>
                            <div className="hh-meter-track">
                                <div
                                    className={`hh-meter-fill${meter >= 1 ? ' full' : ''}`}
                                    style={{ width: `${Math.round(meter * 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Marching Mode banner */}
                        {song && (
                            <div className="hh-marching-banner">
                                🎺 Marching Mode — <strong>{song}</strong>!
                            </div>
                        )}
                    </>
                )}

                {/* Start overlay */}
                {state === 'ready' && (
                    <div className="hh-overlay">
                        <div className="hh-card">
                            <h1 className="hh-title">🎺 The Dodging Judge</h1>
                            <p className="hh-desc">
                                Sprint down the field, dodge the instruments, and grab music
                                notes to fill your Song Meter!
                            </p>
                            <button className="hh-btn hh-btn-primary" onClick={handleStart}>
                                ▶ Start Running
                            </button>
                            <p className="hh-controls">
                                <strong>←/→</strong> or <strong>A/D</strong> to switch lanes
                                &nbsp;·&nbsp; <strong>↑ / Space</strong> to jump
                            </p>
                            <p className="hh-controls hh-controls-touch">
                                On touch: <strong>swipe ←/→</strong> to switch lanes,
                                <strong> swipe up</strong> to jump
                            </p>
                            <Link href="/play" className="hh-back">← All Games</Link>
                        </div>
                    </div>
                )}

                {/* Unsupported overlay — WebGL unavailable */}
                {state === 'unsupported' && (
                    <div className="hh-overlay">
                        <div className="hh-card">
                            <span className="hh-over-emoji" role="img" aria-label="blocked">🚫</span>
                            <h1 className="hh-title">Can't Start This Game</h1>
                            <p className="hh-desc">
                                The Dodging Judge needs WebGL (3D graphics), which your browser
                                just blocked or couldn't provide. This is often caused by
                                hardware acceleration being disabled, or strict privacy/
                                fingerprinting protection (common in Brave's "Aggressive"
                                Shields setting). Try enabling hardware acceleration or
                                lowering fingerprinting protection for this site, then reload.
                            </p>
                            <Link href="/play" className="hh-back">← All Games</Link>
                        </div>
                    </div>
                )}

                {/* Game-over overlay */}
                {state === 'over' && (
                    <div className="hh-overlay">
                        <div className="hh-card">
                            <span className="hh-over-emoji" role="img" aria-label="collision">💥</span>
                            <h1 className="hh-title">Wiped Out!</h1>
                            <p className="hh-final">
                                <span className="hh-final-num">{score}</span>
                                <span className="hh-final-label">yards</span>
                            </p>
                            <p className="hh-final-notes">🎵 {notes} notes collected</p>
                            <button className="hh-btn hh-btn-primary" onClick={handleStart}>
                                ↺ Run Again
                            </button>
                            <Link href="/play" className="hh-back">← All Games</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
