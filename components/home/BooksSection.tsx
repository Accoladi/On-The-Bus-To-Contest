import Image from "next/image";
import Link from "next/link";

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export function BooksSection() {
  return (
    <section id="books" className="relative isolate overflow-hidden bg-[var(--navy)] px-6 py-20 text-white sm:px-10 sm:py-24 lg:min-h-[760px] lg:px-16 lg:py-28">
      <Image src="/images/home/books/bg.png" alt="" fill sizes="100vw" className="-z-10 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,38,.96)_0%,rgba(3,18,38,.82)_40%,rgba(3,18,38,.54)_72%,rgba(3,18,38,.4)_100%)]" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--gold)]"><span>Books</span><span className="h-px w-10 bg-[var(--gold)]" /></div>
          <h2 className="mt-6 max-w-lg text-5xl leading-[.94] sm:text-6xl lg:text-[5rem]">A book for the moments before the <span className="text-[var(--gold)]">first note.</span></h2>
          <p className="mt-7 max-w-md text-base leading-7 text-white/75 sm:text-lg">Poems for marching band members on the way to the field—made for the quiet, nervous, hopeful ride to contest.</p>
          <Link href="/books" className="mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--soft-champagne)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">Explore the books <ArrowIcon /></Link>
        </div>

        <article className="relative overflow-hidden rounded-[28px] border-[3px] border-[var(--gold)] bg-[rgba(7,26,47,.78)] shadow-[0_24px_70px_rgba(0,0,0,.38)] backdrop-blur-sm">
          <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[minmax(190px,.72fr)_1fr] md:p-10 lg:gap-12">
            <div className="relative mx-auto aspect-[.66] w-full max-w-[285px] drop-shadow-[0_22px_22px_rgba(0,0,0,.38)] transition duration-500 hover:-translate-y-2">
              <Image src="/images/books/books-cover/first_note.png" alt="Before the First Note book cover" fill sizes="(max-width: 768px) 70vw, 285px" className="object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Featured book</p>
              <h3 className="mt-4 text-4xl leading-[.98] sm:text-5xl">Before the First Note</h3>
              <p className="mt-4 text-sm font-semibold text-white/70">Poems for the Ride to Contest</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Poetry', 'Reflection', 'Contest Day'].map((tag) => <span key={tag} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-[var(--gold)]">{tag}</span>)}
              </div>
              <p className="mt-6 text-base leading-7 text-white/75">A collection for the student performing for the first time, the senior performing for one of the last times, and everyone wondering: Am I ready?</p>
              <Link href="/books" className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--navy)]">View the book <ArrowIcon /></Link>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-white/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 sm:px-10"><svg aria-hidden="true" className="h-5 w-5 text-white/65" viewBox="0 0 24 24" fill="none"><path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h2v5H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Zm16 0h-2v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="h-6 w-px bg-white/20" /><span>A longer read for the ride</span></div>
        </article>
      </div>
    </section>
  );
}
