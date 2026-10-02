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
          <h2 className="mt-6 max-w-lg text-5xl leading-[.94] sm:text-6xl lg:text-[5rem]">Books for every part of the <span className="text-[var(--gold)]">ride.</span></h2>
          <p className="mt-7 max-w-md text-base leading-7 text-white/75 sm:text-lg">Reflection for the nerves, practical help for the journey, and the history behind the music.</p>
          <Link href="/books" className="mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--champagne)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">Explore the books <ArrowIcon /></Link>
        </div>

        <article className="relative isolate overflow-hidden rounded-[28px] border-[3px] border-[var(--gold)] bg-[var(--navy)] p-4 shadow-[0_0_12px_rgba(226,178,79,.95),0_0_30px_rgba(226,178,79,.55),0_24px_70px_rgba(0,0,0,.38)] sm:p-8">
          <Image src="/images/home/books/book-feature-bg.png" alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="-z-10 object-cover object-center opacity-75" />
          <div className="absolute inset-0 -z-10 bg-[rgba(7,26,47,.42)]" />
          <div className="relative z-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
            {[
              { title: "Before the First Note", image: "/images/books/book-view/firstnote/book-cover.png", href: "/books/before-the-first-note" },
              { title: "Making Friends on the Band Bus", image: "/images/books/books-cover/making_friends.png", href: "/books/making-friends" },
              { title: "The Stories Behind Marching Band", image: "/content/images/books/stories-behind-marchingbandv3.png", href: "/books/the-stories-behind-marching-band" },
            ].map((book) => <div key={book.href} className="flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-[rgba(7,26,47,.28)] px-4 pb-5 pt-4 backdrop-blur-[2px]">
              <div className="relative aspect-[.66] w-full max-w-[230px] overflow-hidden rounded-[2px] border border-[var(--gold)] shadow-[0_0_8px_rgba(226,178,79,.95),0_0_18px_rgba(226,178,79,.5),0_22px_22px_rgba(0,0,0,.38)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_0_12px_rgba(226,178,79,1),0_0_26px_rgba(226,178,79,.7),0_22px_22px_rgba(0,0,0,.38)]"><Image src={book.image} alt={`${book.title} book cover`} fill sizes="(max-width: 767px) 70vw, (max-width: 1279px) 35vw, 230px" className="object-contain" /></div>
              <p className="mt-4 min-h-[3.5rem] text-center text-base font-semibold leading-6 sm:text-lg">{book.title}</p>
              <Link href={book.href} className="mt-4 inline-flex items-center gap-3 rounded-full border border-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--navy)]">Open the book <ArrowIcon /></Link>
            </div>)}
          </div>
        </article>
      </div>
    </section>
  );
}
