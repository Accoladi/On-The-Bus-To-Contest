'use client';
// ============================================================================
// useYouTubePlayer.js — audio-only YouTube playback for the fight-song game
// ============================================================================
//
// The fight songs only exist as YouTube videos (no local files), so this hook
// wraps the YouTube IFrame Player API and exposes a small, audio-player-like
// surface: loadTrack / play / pause / stop + isPlaying / isLoading / progress
// / error. Playback is hard-capped at `clipSeconds` (~1 minute) via the API's
// endSeconds, matching the requested clip length.
//
// The iframe is 0×0 and hidden — the user only ever hears the song.
// ============================================================================

import { useState, useRef, useEffect, useCallback } from 'react';

const YT_API_SRC = 'https://www.youtube.com/iframe_api';

let apiPromise = null;

/** Load the YouTube IFrame API exactly once and resolve with window.YT. */
function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(window.YT);
    };
    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const tag = document.createElement('script');
      tag.src = YT_API_SRC;
      document.head.appendChild(tag);
    }
  });
  return apiPromise;
}

/**
 * @param {Object} [opts]
 * @param {number} [opts.clipSeconds=60] - hard cap on clip length in seconds
 * @returns {{
 *   hostRef: React.RefObject<HTMLDivElement>,
 *   loadTrack: (youtubeId: string) => void,
 *   play: () => void,
 *   pause: () => void,
 *   stop: () => void,
 *   isReady: boolean,
 *   isPlaying: boolean,
 *   isLoading: boolean,
 *   progress: number,
 *   error: string | null,
 *   onEnded: (cb: (() => void) | null) => void,
 * }}
 */
export default function useYouTubePlayer({ clipSeconds = 60 } = {}) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const pollRef = useRef(null);
  const endedCbRef = useRef(null);
  const pendingIdRef = useRef(null); // track requested while player not ready

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== 'function') return;
      const t = p.getCurrentTime() || 0;
      setProgress(Math.min(1, t / clipSeconds));
    }, 250);
  }, [clipSeconds, stopPolling]);

  // ── Create the player once ──
  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return;
        playerRef.current = new YT.Player(hostRef.current, {
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              if (cancelled) return;
              setIsReady(true);
              if (pendingIdRef.current) {
                const id = pendingIdRef.current;
                pendingIdRef.current = null;
                playerRef.current.cueVideoById({ videoId: id, startSeconds: 0, endSeconds: clipSeconds });
              }
            },
            onStateChange: (e) => {
              const YTS = window.YT.PlayerState;
              if (e.data === YTS.PLAYING) {
                setIsPlaying(true);
                setIsLoading(false);
                startPolling();
              } else if (e.data === YTS.PAUSED) {
                setIsPlaying(false);
                stopPolling();
              } else if (e.data === YTS.BUFFERING) {
                setIsLoading(true);
              } else if (e.data === YTS.ENDED) {
                // Reached endSeconds (our ~1-min cap) or the real end.
                setIsPlaying(false);
                setProgress(1);
                stopPolling();
                if (typeof endedCbRef.current === 'function') endedCbRef.current();
              }
            },
            onError: () => {
              setError('This song could not be played. Try the next round.');
              setIsPlaying(false);
              setIsLoading(false);
              stopPolling();
            },
          },
        });
      })
      .catch(() => setError('Audio player failed to load. Check your connection.'));

    return () => {
      cancelled = true;
      stopPolling();
      const p = playerRef.current;
      if (p && typeof p.destroy === 'function') p.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load (cue) a track without playing ──
  const loadTrack = useCallback((youtubeId) => {
    setError(null);
    setProgress(0);
    setIsPlaying(false);
    const p = playerRef.current;
    if (!p || !isReady || typeof p.cueVideoById !== 'function') {
      pendingIdRef.current = youtubeId; // apply once ready
      return;
    }
    p.cueVideoById({ videoId: youtubeId, startSeconds: 0, endSeconds: clipSeconds });
  }, [isReady, clipSeconds]);

  const play = useCallback(() => {
    const p = playerRef.current;
    if (!p || typeof p.playVideo !== 'function') return;
    setError(null);
    setIsLoading(true);
    p.playVideo();
  }, []);

  const pause = useCallback(() => {
    const p = playerRef.current;
    if (p && typeof p.pauseVideo === 'function') p.pauseVideo();
    setIsPlaying(false);
    stopPolling();
  }, [stopPolling]);

  const stop = useCallback(() => {
    const p = playerRef.current;
    if (p && typeof p.stopVideo === 'function') p.stopVideo();
    setIsPlaying(false);
    setProgress(0);
    stopPolling();
  }, [stopPolling]);

  const onEnded = useCallback((cb) => {
    endedCbRef.current = cb;
  }, []);

  return { hostRef, loadTrack, play, pause, stop, isReady, isPlaying, isLoading, progress, error, onEnded };
}
