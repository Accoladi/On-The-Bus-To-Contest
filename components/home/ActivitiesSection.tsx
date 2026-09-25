import Image from "next/image";
import Link from "next/link";

export function ActivitiesSection() {
  return (
    <section id="activities" className="scroll-mt-8 overflow-hidden bg-[var(--champagne)] px-6 py-20 text-[var(--navy)] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div className="relative order-2 grid min-h-[430px] grid-cols-2 gap-4 sm:min-h-[520px]">
          <div className="relative mt-10 overflow-hidden rounded-[26px] bg-[var(--purple)] shadow-xl">
            <Image src="/content/images/coloring-book.jpg" alt="Coloring activity preview" fill sizes="(max-width: 1024px) 50vw, 320px" className="object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-[26px] bg-[var(--navy)] shadow-xl">
            <Image src="/content/images/scavenger.png" alt="Scavenger hunt activity preview" fill sizes="(max-width: 1024px) 50vw, 320px" className="object-cover" />
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border-4 border-[var(--champagne)] bg-[var(--gold)] px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] shadow-lg sm:px-7">Make something</div>
        </div>

        <div className="order-1">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--purple)]">A little space to reset</p>
          <h2 className="mt-5 max-w-xl text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">Do something with your hands.</h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-[var(--slate)] sm:text-lg">Color, explore, and find small ways to make the ride feel like yours. No score required.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/activities/coloring" className="rounded-full bg-[var(--purple)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--navy)]">Open coloring</Link>
            <Link href="/activities/scavenger-hunt" className="rounded-full border-2 border-[var(--purple)] px-6 py-3 font-semibold text-[var(--purple)] transition hover:bg-[var(--purple)] hover:text-white">Scavenger hunt</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
