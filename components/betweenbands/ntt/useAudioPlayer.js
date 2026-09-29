// ============================================================================
// useAudioPlayer.js — Production-grade audio hook for React
// ============================================================================
//
// DESIGN DECISIONS
// ────────────────
// 1. Single Audio instance per hook — prevents overlapping playback.
//    The previous clip is ALWAYS stopped + unloaded before a new one starts.
//
// 2. Uses useRef (not useState) for the Audio object — avoids triggering
//    re-renders on every timeupdate event (fires ~4x/sec).
//
// 3. Playback state (isPlaying, progress, error) IS in useState because
//    the UI needs to react to these changes.
//
// 4. Handles browser autoplay restrictions: play() returns a Promise.
//    If rejected, we catch and set an error state instead of crashing.
//
// 5. Full cleanup on unmount: pauses audio, removes event listeners,
//    sets src to "" to release the network connection / buffer.
//
// ============================================================================

import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * @param {Object} options
 * @param {boolean} [options.preload=false] - If true, preloads the audio metadata
 *        when `loadTrack` is called (enables duration display before play).
 *        If false (default), audio is loaded only on play (saves bandwidth).
 *
 * @returns {{
 *   loadTrack:  (src: string) => void,
 *   play:       () => Promise<void>,
 *   pause:      () => void,
 *   stop:       () => void,
 *   isPlaying:  boolean,
 *   isLoading:  boolean,
 *   progress:   number,     // 0–1
 *   duration:   number,     // seconds
 *   currentTime: number,    // seconds
 *   error:      string|null,
 *   currentSrc: string|null
 * }}
 */
const useAudioPlayer = ({ preload = false } = {}) => {
    const audioRef = useRef(null);
    const animFrameRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [error, setError] = useState(null);
    const [currentSrc, setCurrentSrc] = useState(null);

    // ── Internal: release current audio instance cleanly ──
    const releaseAudio = useCallback(() => {
        if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeAttribute('src');
            audioRef.current.load(); // Reset the element
            audioRef.current = null;
        }
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        setDuration(0);
    }, []);

    // ── Internal: RAF-based progress tracker (avoids flooding renders) ──
    const trackProgress = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || audio.paused) {
            animFrameRef.current = null;
            return;
        }
        const dur = audio.duration || 0;
        const cur = audio.currentTime || 0;
        setCurrentTime(cur);
        setProgress(dur > 0 ? cur / dur : 0);
        animFrameRef.current = requestAnimationFrame(trackProgress);
    }, []);

    // ── Load a new track ──
    const loadTrack = useCallback((src) => {
        // 1. Release previous audio (prevents overlap)
        releaseAudio();
        setError(null);

        if (!src) return;

        // 2. Pre-flight check: does the file exist?
        //    Uses a HEAD request so we don't download the whole file.
        //    If the file is missing (404), show a helpful dev message.
        //    NOTE: Vite's SPA fallback returns 200 + text/html for missing files,
        //    so we also check Content-Type to catch that case.
        fetch(src, { method: 'HEAD' })
            .then(res => {
                const contentType = res.headers.get('content-type') || '';
                const isMissing = !res.ok || !contentType.startsWith('audio');

                if (isMissing) {
                    const filename = src.split('/').pop();
                    setError(
                        `Snippet not found: ${filename}. ` +
                        `Run: npm run make:snippets`
                    );
                    setIsLoading(false);
                    return; // Don't create Audio — file doesn't exist
                }

                // 3. File exists — create Audio instance
                const audio = new Audio();
                audioRef.current = audio;
                setCurrentSrc(src);

                // 4. Event: metadata loaded (duration available)
                audio.addEventListener('loadedmetadata', () => {
                    setDuration(audio.duration);
                    setIsLoading(false);
                });

                // 5. Event: playback ended naturally
                audio.addEventListener('ended', () => {
                    setIsPlaying(false);
                    setProgress(1);
                    setCurrentTime(audio.duration);
                    if (animFrameRef.current) {
                        cancelAnimationFrame(animFrameRef.current);
                        animFrameRef.current = null;
                    }
                });

                // 6. Event: error
                audio.addEventListener('error', () => {
                    const code = audio.error?.code;
                    const messages = {
                        1: 'Audio loading was aborted.',
                        2: 'Snippet not found. Run: npm run make:snippets',
                        3: 'Audio decoding failed.',
                        4: 'Audio format is not supported.',
                    };
                    setError(messages[code] || 'Unknown audio error.');
                    setIsPlaying(false);
                    setIsLoading(false);
                });

                // 7. Set preload strategy
                audio.preload = preload ? 'metadata' : 'none';
                audio.src = src;

                if (preload) {
                    setIsLoading(true);
                    audio.load();
                }
            })
            .catch(() => {
                // Network completely failed (offline, CORS, etc.)
                setError('Could not check audio file. Are you offline?');
                setIsLoading(false);
            });
    }, [releaseAudio, preload]);

    // ── Play ──
    const play = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) {
            setError('No track loaded. Call loadTrack(src) first.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // This Promise rejects if browser blocks autoplay
            await audio.play();
            setIsPlaying(true);
            setIsLoading(false);
            // Start RAF progress tracking
            animFrameRef.current = requestAnimationFrame(trackProgress);
        } catch (err) {
            setIsLoading(false);
            if (err.name === 'NotAllowedError') {
                setError('Tap the play button to listen (autoplay blocked by browser).');
            } else if (err.name === 'AbortError') {
                // Play was interrupted by a new load — not a real error
                return;
            } else {
                setError(`Playback failed: ${err.message}`);
            }
        }
    }, [trackProgress]);

    // ── Pause ──
    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (audio && !audio.paused) {
            audio.pause();
            setIsPlaying(false);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
        }
    }, []);

    // ── Stop (pause + rewind) ──
    const stop = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
        }
    }, []);

    // ── Cleanup on unmount ──
    useEffect(() => {
        return () => {
            releaseAudio();
        };
    }, [releaseAudio]);

    return {
        loadTrack,
        play,
        pause,
        stop,
        isPlaying,
        isLoading,
        progress,
        duration,
        currentTime,
        error,
        currentSrc,
    };
};

export default useAudioPlayer;
