'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useFightSongCrossword } from './useFightSongCrossword';

// ─── Confetti ──────────────────────────────────────────────────────────────
const COLORS = ['#f4c430', '#ffd966', '#ffffff', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6'];
function Confetti() {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i, left: `${Math.random() * 100}vw`, color: COLORS[i % COLORS.length],
        duration: `${2 + Math.random() * 2.5}s`, delay: `${Math.random() * 1.5}s`,
        size: `${6 + Math.random() * 8}px`, shape: i % 3 === 0 ? '50%' : '2px',
    }));
    return <>{pieces.map(p => <div key={p.id} className="cw2-confetti" style={{ left: p.left, background: p.color, width: p.size, height: p.size, borderRadius: p.shape, animationDuration: p.duration, animationDelay: p.delay }} />)}</>;
}

// ─── Win Overlay ───────────────────────────────────────────────────────────
function WinOverlay({ puzzleTheme, onPlayAgain, backTo, backLabel }) {
    return (
        <>
            <Confetti />
            <div className="cw2-win-overlay" role="dialog" aria-modal="true">
                <div className="cw2-win-card">
                    <span className="cw2-win-emoji" role="img" aria-label="trophy">🏆</span>
                    <h2>Puzzle Complete!</h2>
                    <p>You solved the <strong>{puzzleTheme}</strong> puzzle. March on! 🎺</p>
                    <div className="cw2-win-actions">
                        <button className="cw2-btn cw2-btn-check" onClick={onPlayAgain}>Play Again</button>
                        <button className="cw2-btn cw2-btn-reset">
                            <Link href={backTo} style={{ textDecoration: 'none', color: 'inherit' }}>{backLabel}</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ─── Coming Soon panel ────────────────────────────────────────────────────
function ComingSoon({ puzzle }) {
    return (
        <div className="cw2-coming-soon">
            <span className="cw2-coming-soon-icon">🚧</span>
            <h2>Hard Puzzle — Coming Soon!</h2>
            <p>{puzzle.description}</p>
            <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>
                More marching band terms are on the way. Check back after the next competition season!
            </p>
        </div>
    );
}

// ─── Grid ──────────────────────────────────────────────────────────────────
function CrosswordGrid({ puzzle, grid, blackSet, answers, getCellStatus, handleCellClick, wordList, zoom }) {
    const numMap = {};
    wordList.forEach(w => { const k = `${w.row},${w.col}`; if (!numMap[k]) numMap[k] = w.clueNum; });
    const { rows, cols } = puzzle;
    return (
        <div className="cw2-grid" style={{ '--cw-zoom': zoom, gridTemplateColumns: `repeat(${cols}, calc(var(--cw-cell-size) * var(--cw-zoom)))` }} role="grid" aria-label="Crossword grid">
            {Array.from({ length: rows }, (_, row) =>
                Array.from({ length: cols }, (_, col) => {
                    if (blackSet.has(`${row},${col}`)) return <div key={`${row}-${col}`} className="cw2-cell cw2-cell-black" aria-hidden="true" />;
                    const status = getCellStatus(row, col);
                    const num = numMap[`${row},${col}`];
                    const typed = answers[row]?.[col] ?? '';
                    return (
                        <div key={`${row}-${col}`} className={`cw2-cell cw2-cell-white ${status}`} onClick={() => handleCellClick(row, col)} role="button" aria-label={`R${row + 1}C${col + 1}${typed ? ` ${typed}` : ''}`}>
                            {num && <span className="cw2-cell-number" aria-hidden="true">{num}</span>}
                            <span className="cw2-cell-letter" aria-hidden="true">{typed}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
}

// ─── Audio Control Hook ────────────────────────────────────────────────────
function useAudioPlayer() {
    const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null);
    const audioRef = React.useRef(null);

    const toggleAudio = React.useCallback((audioUrl) => {
        if (!audioUrl) return;

        // If clicking the same audio that's playing, pause it
        if (currentlyPlaying === audioUrl && audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setCurrentlyPlaying(null);
            return;
        }

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // Create new audio and play
        audioRef.current = new Audio(audioUrl);
        audioRef.current.play().catch(() => {
            // Fail gracefully if audio doesn't exist or can't play
            setCurrentlyPlaying(null);
        });

        audioRef.current.onended = () => setCurrentlyPlaying(null);
        setCurrentlyPlaying(audioUrl);
    }, [currentlyPlaying]);

    return { currentlyPlaying, toggleAudio };
}

// ─── Hidden YouTube Audio Player ────────────────────────────────────────────
function HiddenYouTubePlayer({ youtubeId }) {
    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            <iframe
                width="0"
                height="0"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

// ─── Compact Now Playing Control ─────────────────────────────────────────────
function NowPlayingControl({ clueNum, direction, onStop }) {
    return (
        <div className="cw2-now-playing">
            <span className="cw2-now-playing-label">▶ Playing {clueNum} {direction === 'across' ? '→' : '↓'}</span>
            <button className="cw2-now-playing-stop" onClick={onStop} title="Stop" aria-label="Stop audio">✕</button>
        </div>
    );
}

// ─── YouTube Play Button ───────────────────────────────────────────────────
function YouTubePlayButton({ youtubeId, isPlaying, onPlay }) {
    return (
        <button
            className={`cw2-yt-btn ${isPlaying ? 'playing' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onPlay(youtubeId);
            }}
            aria-label={isPlaying ? 'Now playing' : 'Play audio'}
            title={isPlaying ? 'Now playing' : 'Play audio'}
        >
            {isPlaying ? '⏸' : '▶'}
        </button>
    );
}

// ─── Clue List ─────────────────────────────────────────────────────────────
function ClueList({ title, icon, words, activeWordId, onClueClick, playingYoutubeId, onYouTubePlay }) {
    const activeRef = useRef(null);

    useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [activeWordId]);

    return (
        <div className="cw2-clue-section">
            <h3>{icon} {title}</h3>
            {words.map(w => (
                <div key={w.id} ref={w.id === activeWordId ? activeRef : null} className={`cw2-clue-item${w.id === activeWordId ? ' active' : ''}`} onClick={() => onClueClick(w.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClueClick(w.id)}>
                    <div className="cw2-clue-content">
                        <span className="cw2-clue-num">{w.clueNum}.</span>
                        <span className="cw2-clue-text">{w.clue} ({w.word.length})</span>
                    </div>
                    {w.youtubeId && (
                        <YouTubePlayButton
                            youtubeId={w.youtubeId}
                            isPlaying={playingYoutubeId === w.youtubeId}
                            onPlay={onYouTubePlay}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Difficulty Badge ──────────────────────────────────────────────────────
function DiffBadge({ difficulty }) {
    const map = { easy: { label: '🟡 Yellow / Level I', cls: 'diff-easy' }, medium: { label: '🟢 Green / Level II', cls: 'diff-medium' }, hard: { label: '🔵 Blue / Level III', cls: 'diff-hard' } };
    const d = map[difficulty] || map.easy;
    return <span className={`cw2-diff-badge ${d.cls}`}>{d.label}</span>;
}

// ─── Main Crossword Game (shared component) ────────────────────────────────
/**
 * @param {object[]} puzzleSet   - array of puzzle objects (MB_PUZZLES or FS_PUZZLES)
 * @param {string}   gameTitle   - header title e.g. "🥁 Marching Band Terms Crossword"
 * @param {string}   gameSubtitle
 * @param {string}   backTo      - route for "All Games" link
 * @param {string}   backLabel
 */
export default function CrosswordGame({ puzzleSet, gameTitle, gameSubtitle, backTo = '/games', backLabel = 'All Games', bgImage }) {
    const containerRef = useRef(null);
    const gridWrapperRef = useRef(null);
    const [zoom, setZoom] = React.useState(1);
    const [playingYoutubeId, setPlayingYoutubeId] = React.useState(null);
    const [revealClue, setRevealClue] = React.useState(false);
    const {
        puzzle, puzzleIndex, setPuzzleIndex, isComingSoon,
        grid, wordList, blackSet, answers, activeWordId,
        activeCells, checkState, won,
        handleCellClick, handleClueClick, handleKeyDown,
        checkAnswers, revealAnswers, resetPuzzle, getCellStatus,
    } = useFightSongCrossword(puzzleSet);

    const playingWordId = React.useMemo(() => {
        if (!playingYoutubeId || !wordList) return null;
        return wordList.findIndex(w => w.youtubeId === playingYoutubeId);
    }, [playingYoutubeId, wordList]);

    useEffect(() => {
        if (puzzle) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'game_start',
                game_id: `crossword_${puzzle.id || puzzleIndex}`,
                game_title: gameTitle || "Crossword Game",
                game_detail: puzzle.theme
            });
        }
    }, [puzzleIndex, puzzle, gameTitle]);

    useEffect(() => {
        if (won && puzzle) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'game_complete',
                game_id: `crossword_${puzzle.id || puzzleIndex}`,
                game_title: gameTitle || "Crossword Game",
                game_detail: puzzle.theme,
                success: true
            });
        }
    }, [won, puzzle, puzzleIndex, gameTitle]);

    useEffect(() => { containerRef.current?.focus(); }, [puzzleIndex]);

    // Reset zoom to 100% when puzzle changes
    useEffect(() => { setZoom(1); }, [puzzleIndex]);

    // Close YouTube player when puzzle changes
    useEffect(() => { setPlayingYoutubeId(null); }, [puzzleIndex]);

    // Reset clue reveal when active word changes
    useEffect(() => { setRevealClue(false); }, [activeWordId]);

    // Auto-scroll grid to show active word.
    // Cells now carry the zoom in their real layout size (no CSS transform), so we
    // measure an actual rendered cell rather than computing from the base token.
    useEffect(() => {
        if (!activeWordId || !wordList[activeWordId] || !gridWrapperRef.current) return;

        const activeWord = wordList[activeWordId];
        const wrapper = gridWrapperRef.current;
        const cell = wrapper.querySelector('.cw2-cell');
        if (!cell) return;

        // Effective (zoomed) cell pitch, including the 1px grid gap.
        const cellSize = cell.getBoundingClientRect().width + 1;

        const colPixel = activeWord.col * cellSize;
        const rowPixel = activeWord.row * cellSize;

        // Center the word's starting cell within the wrapper viewport.
        wrapper.scrollLeft = colPixel - (wrapper.clientWidth / 2) + (cellSize / 2);
        wrapper.scrollTop = rowPixel - (wrapper.clientHeight / 2) + (cellSize / 2);
    }, [activeWordId, wordList, zoom]);

    const activeWord = wordList[activeWordId];
    const acrossWords = wordList.filter(w => w.direction === 'across');
    const downWords = wordList.filter(w => w.direction === 'down');

    const ZOOM_MIN = 0.2;
    const ZOOM_MAX = 2.5;

    const handleZoom = (delta) => {
        setZoom(prev => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, prev + delta)));
    };

    // Compute the zoom that makes the whole grid fit inside the wrapper viewport.
    const handleFitToContainer = () => {
        const wrapper = gridWrapperRef.current;
        const grid = wrapper?.firstElementChild;
        if (!wrapper || !grid) return;

        const cs = window.getComputedStyle(wrapper);
        const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const availW = wrapper.clientWidth - padX;
        const availH = wrapper.clientHeight - padY;

        // Grid's rendered size at the current zoom → natural (zoom=1) size.
        const rect = grid.getBoundingClientRect();
        const naturalW = rect.width / zoom;
        const naturalH = rect.height / zoom;
        if (!naturalW || !naturalH) return;

        const fit = Math.min(availW / naturalW, availH / naturalH);
        setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, fit)));
    };

    const handleYouTubePlay = (youtubeId) => {
        setPlayingYoutubeId(youtubeId);
    };

    const handleStopYouTube = () => {
        setPlayingYoutubeId(null);
    };

    return (
        <div className="cw2-page" ref={containerRef} tabIndex={-1} onKeyDown={handleKeyDown} style={{ outline: 'none', ...(bgImage ? { backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
            {/* Header */}
            <header className="cw2-header">
                <h1>{gameTitle}</h1>
            </header>

            {/* Active clue toggle */}
            {!isComingSoon && activeWord && (
                <div className="cw2-active-clue-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <button className="cw2-btn cw2-btn-check" style={{ marginBottom: '0.5rem' }} onClick={() => setRevealClue(!revealClue)}>
                        {revealClue ? 'Hide Current Clue' : 'Reveal Current Clue'}
                    </button>
                    {revealClue && (
                        <div className="cw2-active-clue-banner" role="status" aria-live="polite">
                            <strong>{activeWord.clueNum} {activeWord.direction === 'across' ? '→' : '↓'}</strong>
                            {activeWord.clue}
                            <span style={{ opacity: 0.6, marginLeft: '0.5rem' }}>({activeWord.word.length})</span>
                        </div>
                    )}
                </div>
            )}

            {/* Coming Soon */}
            {isComingSoon ? (
                <ComingSoon puzzle={puzzle} />
            ) : (
                <div className="cw2-layout">
                    {/* Left: Down Clues */}
                    <div className="cw2-clues-side">
                        <ClueList title="Down" icon="↓" words={downWords} activeWordId={activeWordId} onClueClick={handleClueClick} playingYoutubeId={playingYoutubeId} onYouTubePlay={handleYouTubePlay} />
                    </div>

                    {/* Middle: Grid & Controls */}
                    <div className="cw2-grid-panel">
                        <div className="cw2-grid-wrapper" ref={gridWrapperRef}>
                            <CrosswordGrid puzzle={puzzle} grid={grid} blackSet={blackSet} answers={answers} getCellStatus={getCellStatus} handleCellClick={handleCellClick} wordList={wordList} zoom={zoom} />
                        </div>

                        {/* Controls Panel */}
                        <div className="cw2-controls-panel">
                            <div className="cw2-controls">
                                <button className="cw2-btn cw2-btn-check" onClick={checkAnswers}>✓ Check Answers</button>
                                <button className="cw2-btn cw2-btn-reveal" onClick={revealAnswers}>Reveal All</button>
                                <button className="cw2-btn cw2-btn-reset" onClick={resetPuzzle}>↺ Reset</button>
                            </div>

                            {/* Difficulty / Puzzle tabs */}
                            {puzzleSet.length > 1 && (
                                <div className="cw2-tabs" role="tablist" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                    {puzzleSet.map((p, i) => (
                                        <button key={p.id} className={`cw2-tab${puzzleIndex === i ? ' active' : ''}`} role="tab" aria-selected={puzzleIndex === i} onClick={() => setPuzzleIndex(i)}>
                                            {p.theme}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="cw2-zoom-controls">
                                <button className="cw2-zoom-btn" onClick={() => handleZoom(-0.1)} title="Zoom out" aria-label="Zoom out">−</button>
                                <span className="cw2-zoom-display">{Math.round(zoom * 100)}%</span>
                                <button className="cw2-zoom-btn" onClick={() => handleZoom(0.1)} title="Zoom in" aria-label="Zoom in">+</button>
                                <button className="cw2-zoom-fit" onClick={handleFitToContainer} title="Reset zoom" aria-label="Reset zoom to fit">Fit</button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Across Clues */}
                    <div className="cw2-clues-side">
                        <ClueList title="Across" icon="→" words={acrossWords} activeWordId={activeWordId} onClueClick={handleClueClick} playingYoutubeId={playingYoutubeId} onYouTubePlay={handleYouTubePlay} />
                    </div>

                    {/* Now Playing Control Bar */}
                    {playingYoutubeId && playingWordId !== null && (
                        <NowPlayingControl clueNum={wordList[playingWordId].clueNum} direction={wordList[playingWordId].direction} onStop={handleStopYouTube} />
                    )}
                </div>
            )}

            {/* Hidden YouTube Players */}
            {playingYoutubeId && <HiddenYouTubePlayer youtubeId={playingYoutubeId} />}

            {/* Win overlay */}
            {won && <WinOverlay puzzleTheme={puzzle.theme} onPlayAgain={resetPuzzle} backTo={backTo} backLabel={backLabel} />}
        </div>
    );
}
