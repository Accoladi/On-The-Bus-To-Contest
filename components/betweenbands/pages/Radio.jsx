import { Heart, Link2, ListMusic, Pause, Play, RotateCcw, Repeat2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { filterRadioSongs, getRadioSongPriority } from '../../data/radioSongs';
import TrackDuration from '../radio/TrackDuration';

const API_URL = import.meta.env.VITE_BCN_RADIO_API_URL || '/radio/songs.json';
const PAGE_SIZE = 12;

function TrackCard({ song, index, queue }) {
  const player = usePlayer();
  const active = player.currentSong?.id === song.id;
  const liked = player.likedSongs.has(song.id);
  const play = () => active ? player.togglePlayPause() : player.playSong(song, queue);
  const share = async (event) => {
    event.stopPropagation();
    try { await navigator.clipboard.writeText(window.location.origin + '/radio/' + encodeURIComponent(song.slug)); } catch { /* ignore */ }
  };
  return <article onClick={play} className={'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ' + (active ? 'border-[#1769e8]/40 ring-1 ring-blue-100' : 'border-gray-200')}>
    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
      <img src={song.coverImageUrl} alt={song.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute left-3 top-3 flex gap-2"><span className="rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.2em] text-white backdrop-blur">{String(index + 1).padStart(2, '0')}</span>{active && <span className="rounded-full bg-[#1769e8] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.18em] text-white">{player.isPlaying ? 'Playing' : 'Paused'}</span>}</div>
      <button type="button" onClick={(event) => { event.stopPropagation(); play(); }} aria-label={active && player.isPlaying ? 'Pause' : 'Play song'} className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1769e8] shadow-lg transition hover:scale-105">{active && player.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}</button>
    </div>
    <div className="flex flex-1 flex-col p-4"><h4 className="line-clamp-2 text-base font-black leading-tight text-[#111b2d]">{song.title}</h4><p className="mt-1 text-sm text-gray-500">{song.artist}</p><div className="mt-auto flex items-center justify-between pt-4"><span className="text-xs font-semibold text-gray-400"><TrackDuration song={song} /></span><div className="flex gap-1"><button type="button" onClick={(event) => { event.stopPropagation(); player.toggleLike(song.id); }} aria-label={liked ? 'Unlike' : 'Like'} className={'rounded-full p-2 ' + (liked ? 'text-red-500' : 'text-gray-300 hover:text-red-400')}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button><button type="button" onClick={share} aria-label="Share song" className="rounded-full p-2 text-gray-300 hover:text-[#1769e8]"><Link2 size={17} /></button></div></div></div>
  </article>;
}

export default function Radio() {
  const { slug } = useParams();
  const player = usePlayer();
  const [songs, setSongs] = useState([]);
  const [sort, setSort] = useState('default');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [error, setError] = useState('');
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Unable to load radio'); return response.json(); })
      .then((data) => setSongs(filterRadioSongs(Array.isArray(data) ? data : data.songs || [])))
      .catch((requestError) => { if (requestError.name !== 'AbortError') setError('Radio is temporarily unavailable.'); });
    return () => controller.abort();
  }, []);

  const sortedSongs = useMemo(() => {
    const list = [...songs];
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'za') list.sort((a, b) => b.title.localeCompare(a.title));
    else list.sort((a, b) => getRadioSongPriority(a) - getRadioSongPriority(b) || (a.sortOrder || 0) - (b.sortOrder || 0));
    return list;
  }, [songs, sort]);
  const featured = songs[0];
  const visibleSongs = sortedSongs.slice(0, visibleCount);
  const activeFeatured = player.currentSong?.id === featured?.id;

  useEffect(() => {
    const linked = songs.find((song) => song.slug === slug || song.id === slug);
    if (linked && player.currentSong?.id !== linked.id) player.playSong(linked, songs);
  }, [slug, songs, player.currentSong?.id, player.playSong]);

  const shareFeatured = async () => {
    if (!featured) return;
    try { await navigator.clipboard.writeText(window.location.origin + '/radio/' + encodeURIComponent(featured.slug)); } catch { /* ignore */ }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return <main className="min-h-screen bg-[#f7fbff] pb-40 text-[#111b2d]">
    <section className="mx-auto w-full max-w-7xl px-4 pb-6 pt-8 text-center sm:px-6 sm:pt-10"><p className="text-[11px] font-black uppercase tracking-[.3em] text-[#1769e8]">Radio Section</p><h1 className="mt-2 text-3xl font-black uppercase tracking-tight">Radio</h1></section>

    {featured && <section className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-b-[2rem]">
      <img src={featured.coverImageUrl} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b17] via-[#0a101d]/80 to-[#151923]/60" />
      <div className="bb-radio-hero-inner relative z-10 mx-auto max-w-7xl gap-6 px-6 py-10 lg:gap-10 lg:px-12 lg:py-16">
        <img src={featured.coverImageUrl} alt={featured.title} className="bb-radio-hero-art aspect-[16/10] rounded-2xl border border-white/10 object-cover shadow-2xl" />
        <div className="min-w-0 flex-1 text-white"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#1769e8]/90 px-3 py-1 text-xs font-bold uppercase tracking-widest"><Play size={10} fill="currentColor" /> Featured</span><h2 className="mt-4 text-4xl font-black leading-none tracking-tight drop-shadow lg:text-6xl">{featured.title}</h2><p className="mb-8 mt-3 text-lg font-medium text-white/65 lg:text-xl">{featured.artist}</p>
          <div className="flex flex-wrap items-center gap-3"><button onClick={() => activeFeatured ? player.togglePlayPause() : player.playSong(featured, songs)} className="inline-flex items-center gap-2 rounded-full bg-[#1769e8] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/35">{activeFeatured && player.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />} {activeFeatured && player.isPlaying ? 'Pause' : activeFeatured ? 'Resume' : 'Play Now'}</button><button onClick={() => player.toggleLike(featured.id)} aria-label="Like song" className={'flex h-12 w-12 items-center justify-center rounded-full ' + (player.likedSongs.has(featured.id) ? 'bg-red-500 text-white' : 'bg-white/15 text-white/80')}><Heart size={20} fill={player.likedSongs.has(featured.id) ? 'currentColor' : 'none'} /></button><button onClick={player.toggleLoop} aria-label="Loop song" className={'flex h-12 w-12 items-center justify-center rounded-full ' + (player.isLooped ? 'bg-[#f8c94d] text-gray-900' : 'bg-white/15 text-white/80')}><Repeat2 size={19} /></button><button onClick={player.replay} disabled={!activeFeatured} aria-label="Replay from beginning" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white/80 disabled:opacity-30"><RotateCcw size={19} /></button><div className="relative"><button onClick={shareFeatured} aria-label="Share song" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white/80"><Link2 size={19} /></button>{shareToast && <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-xs">Link copied!</span>}</div></div>
        </div>
      </div>
    </section>}

    <section className="mx-auto mt-10 w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-black">All Tracks</h2><p className="mt-1 text-sm text-gray-500">Stream, like, and share your favorite songs</p></div><div className="flex flex-col gap-3 sm:items-end"><div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><ListMusic size={18} className="text-[#1769e8]" /> {sortedSongs.length} {sortedSongs.length === 1 ? 'Track' : 'Tracks'}</div><div className="flex rounded-xl bg-gray-100 p-1">{[['default','Default'],['az','A → Z'],['za','Z → A']].map(([key,label]) => <button key={key} onClick={() => setSort(key)} className={'rounded-lg px-3 py-1.5 text-xs font-semibold ' + (sort === key ? 'bg-white text-[#1769e8] shadow-sm' : 'text-gray-500')}>{label}</button>)}</div></div></div>
      {error ? <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500">{error}</div> : <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleSongs.map((song, index) => <TrackCard key={song.id} song={song} index={index} queue={sortedSongs} />)}</div>}
      {visibleCount < sortedSongs.length && <div className="flex justify-center pt-7"><button onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, sortedSongs.length))} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:border-[#1769e8] hover:text-[#1769e8]">Load more tracks</button></div>}
    </section>
  </main>;
}
