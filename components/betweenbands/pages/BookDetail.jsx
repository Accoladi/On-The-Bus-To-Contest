import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBookBySlug } from '../../data/books';
import BookReader from './BookReader';

export default function BookDetail() {
  const { slug } = useParams();
  const book = getBookBySlug(slug);
  const [bookHtml, setBookHtml] = useState('');
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!book || book.status !== 'available') return;
    const controller = new AbortController();
    fetch(`/books/${book.slug}.html`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load book');
        return response.text();
      })
      .then(setBookHtml)
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadFailed(true);
      });
    return () => controller.abort();
  }, [book]);

  if (!book) {
    return <main className="flex min-h-[70vh] items-center justify-center bg-[#F4F0E8] px-6 text-center text-[#06182B]"><div><BookOpen className="mx-auto text-[#D6A62E]" size={48} /><h1 className="mt-5 font-display text-5xl font-black uppercase">Book not found</h1><Link to="/books" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#06182B] px-6 py-4 text-sm font-bold text-white"><ArrowLeft size={16} /> Back to Books</Link></div></main>;
  }

  const isAvailable = book.status === 'available';

  return <main className="min-h-screen bg-[#F4F0E8] text-[#06182B]">
    <section className="book-detail-hero bg-[#06182B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]"><Link to="/books" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[#E4B935]"><ArrowLeft size={14} /> Back to Books</Link><div className="mt-12 grid items-center gap-12 lg:grid-cols-[280px_1fr]"><div className="rounded-[22px] bg-[#102945] p-5 shadow-[14px_20px_36px_rgba(0,0,0,.3)]"><img src={book.coverImageUrl} alt={`${book.title} cover`} className="w-full rounded-xl object-contain" /></div><div><p className="text-[12px] font-black uppercase tracking-[.24em] text-[#E4B935]">{isAvailable ? `Complete book · ${book.chapterCount} chapters` : 'Book details coming soon'}</p><h1 className="mt-4 max-w-4xl font-display text-6xl font-black uppercase leading-[.88] sm:text-8xl">{book.title}</h1><p className="mt-6 text-lg font-bold text-white/75">{book.subtitle}</p><p className="mt-3 text-sm text-white/55">By {book.author}{isAvailable ? ` · ${book.chapterCount} chapters` : ''}</p></div></div></div>
    </section>

    {isAvailable ? <section className="px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-16">{loadFailed ? <p className="mx-auto max-w-[860px] rounded-xl bg-white p-6 text-[#58616a]">The book could not be loaded. Please refresh the page and try again.</p> : bookHtml ? <BookReader book={book} bookHtml={bookHtml} /> : <p className="mx-auto max-w-[860px] text-[#58616a]">Loading book…</p>}</section> : <section className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20"><article className="mx-auto max-w-[860px] rounded-[28px] border border-[#D6A62E]/35 bg-white px-7 py-12 text-center shadow-[0_20px_55px_rgba(6,24,43,.08)] sm:px-14 sm:py-16"><p className="text-[12px] font-black uppercase tracking-[.22em] text-[#B6292E]">Placeholder content</p><h2 className="mt-4 font-display text-5xl font-black uppercase leading-none sm:text-6xl">The story is on its way.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#58616a]">The final synopsis, chapter list, publication details, and reading content for <em>{book.title}</em> have not been added yet. This placeholder will be replaced when the completed manuscript and book information are ready.</p><Link to="/books" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#06182B] px-6 py-4 text-sm font-bold text-white"><ArrowLeft size={16} /> Browse both books</Link></article></section>}
  </main>;
}
