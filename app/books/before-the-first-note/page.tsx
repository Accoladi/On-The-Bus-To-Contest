import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";
import { beforeTheFirstNoteSections } from "@/content/books/beforeTheFirstNote";

function sectionId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BeforeTheFirstNotePage() {
  const headings = beforeTheFirstNoteSections.filter((section) => section.type === "heading").slice(0, 12);

  return (
    <main className="min-h-screen bg-white text-[var(--navy)]">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,26,47,.98),rgba(7,26,47,.72)_55%,rgba(7,26,47,.3))]" />
        <SiteNav solid />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:grid-cols-[280px_1fr] lg:gap-20 lg:px-16 lg:pb-24 lg:pt-40">
          <div className="relative mx-auto aspect-[.66] w-full max-w-[280px] drop-shadow-[0_24px_28px_rgba(0,0,0,.42)]">
            <Image src="/images/books/books-cover/first_note.png" alt="Before the First Note cover" fill priority sizes="280px" className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--gold)]"><span>Book</span><span className="h-px w-10 bg-[var(--gold)]" /></div>
            <h1 className="mt-6 max-w-3xl text-6xl leading-[.9] sm:text-7xl lg:text-[6.5rem]">Before the<br /><span className="text-[var(--gold)]">First Note</span></h1>
            <p className="mt-6 text-xl text-white/80">Poems for the Ride to Contest</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">For marching band members on the way to the field.</p>
            <Link href="/books" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-[var(--gold)] hover:text-[var(--gold)]">← All books</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--navy)]/10 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">A companion for the ride</p>
          <p className="text-lg leading-8 text-[var(--slate)] sm:text-xl">Open it anywhere. Find the poem you need today. Read one, read five, or save another for the ride home.</p>
        </div>
      </section>

      <section className="border-t border-[var(--navy)]/10 bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">In this book</p>
            <nav className="mt-5 border-l border-[var(--gold)] pl-4">
              {headings.map((heading) => <a key={heading.text} href={`#${sectionId(heading.text)}`} className="mb-3 block text-sm leading-5 text-[var(--slate)] transition hover:text-[var(--purple)]">{heading.text}</a>)}
            </nav>
            <div className="mt-10 rounded-2xl bg-[var(--navy)] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--soft-champagne)]">A note for the ride</p>
              <p className="mt-3 text-sm leading-6 text-white/75">This is not homework. Read what you need, then look up and notice the people sharing the bus with you.</p>
            </div>
          </aside>

          <article className="max-w-3xl">
            <div className="mb-10 border-b border-[var(--navy)]/10 pb-7 text-sm text-[var(--slate)]">Before the First Note <span className="mx-2 text-[var(--gold)]">•</span> Poems for the Ride to Contest</div>
            {beforeTheFirstNoteSections.map((section, index) => section.type === "heading" ? <h2 id={sectionId(section.text)} key={`${section.type}-${index}`} className="mb-5 mt-12 scroll-mt-8 font-[family-name:var(--font-display)] text-3xl leading-[1.02] sm:text-4xl">{section.text}</h2> : <p key={`${section.type}-${index}`} className="mb-6 whitespace-pre-line text-[1.08rem] leading-8 text-[#35465a]">{section.text}</p>)}
            <div className="mt-14 border-t border-[var(--navy)]/10 pt-8"><Link href="/books" className="inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--soft-champagne)]">Back to books <span aria-hidden="true">→</span></Link></div>
          </article>
        </div>
      </section>
    </main>
  );
}
