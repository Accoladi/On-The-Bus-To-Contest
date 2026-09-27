import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function BooksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--navy)]">
      <section className="relative isolate min-h-[540px] overflow-hidden bg-[var(--navy)] text-white sm:min-h-[600px] lg:min-h-[650px]">
        <Image src="/images/books/hero-bg.png" alt="Marching band student reading on the bus at sunset" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,38,.94),rgba(3,18,38,.64)_48%,rgba(3,18,38,.2)_100%)]" />
        <SiteNav />
        <div className="relative mx-auto max-w-[1320px] px-6 pb-28 pt-36 sm:px-10 sm:pb-36 lg:px-16 lg:pt-44">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]"><span className="h-px w-8 bg-[var(--gold)]" /><span>Books</span></div>
          <h1 className="mt-6 max-w-2xl text-6xl leading-[.88] sm:text-7xl lg:text-[6.5rem]">Stories that<br /><span className="text-[var(--gold)]">stay with you.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Longer journeys for the ride: history, heart, and the stories that make band more than a performance.</p>
        </div>
      </section>

      <section className="relative -mt-14 bg-[var(--cream)] px-6 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-16">
        <div className="pointer-events-none absolute -top-16 left-[-5%] h-24 w-[110%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-[var(--cream)]" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--navy)]"><span className="h-px w-8 bg-[var(--gold)]" /><span>Featured book</span></div>
          <article className="relative mt-5 overflow-hidden rounded-[26px] border border-[var(--navy)]/8 bg-[rgba(255,255,255,.5)] shadow-[0_18px_45px_rgba(7,26,47,.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(231,184,75,.14),transparent_34%)]" />
            <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-[minmax(230px,.8fr)_1.2fr] lg:gap-16 lg:px-16 lg:py-12">
              <div className="relative mx-auto aspect-[.66] w-full max-w-[300px] drop-shadow-[0_22px_22px_rgba(7,26,47,.25)] transition duration-500 hover:-translate-y-2">
                <Image src="/images/books/books-cover/first_note.png" alt="Before the First Note book cover" fill sizes="(max-width: 768px) 70vw, 300px" className="object-contain" />
              </div>
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2">{["Poetry", "Reflection", "Contest Day"].map((tag) => <span key={tag} className="rounded-full border border-[var(--gold)]/45 bg-white/45 px-3 py-1.5 text-xs font-semibold text-[var(--slate)]">{tag}</span>)}</div>
                <h2 className="mt-6 text-5xl leading-[.92] sm:text-6xl">Before the First Note</h2>
                <p className="mt-4 font-[family-name:var(--font-display)] text-xl italic text-[var(--slate)]">Poems for the Ride to Contest</p>
                <p className="mt-6 max-w-xl text-base leading-7 text-[var(--slate)]">A collection for the student performing for the first time, the senior performing for one of the last times, and everyone wondering: Am I ready?</p>
                <Link href="/books/before-the-first-note" className="mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--soft-champagne)]">View the book <ArrowIcon /></Link>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-[var(--navy)]/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]/70 sm:px-10"><span className="text-lg" aria-hidden="true">♫</span><span className="h-5 w-px bg-[var(--navy)]/15" /><span>A longer read for the ride</span></div>
          </article>
        </div>
      </section>
    </main>
  );
}
