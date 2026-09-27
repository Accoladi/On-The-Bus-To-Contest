import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

const activities = [
  { eyebrow: "Color and make", title: "Coloring on the road", description: "A quiet creative reset for the moments when you want your hands busy and your mind somewhere else.", image: "/content/images/coloring-book.jpg", href: "/activities/coloring", tone: "bg-[var(--purple)]" },
  { eyebrow: "Look a little closer", title: "Bus ride scavenger hunt", description: "A playful list of things to spot, notice, and share before the bus reaches the stadium.", image: "/content/images/scavenger.png", href: "/activities/scavenger-hunt", tone: "bg-[var(--navy)]" },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne)] text-[var(--navy)]">
      <section className="relative overflow-hidden bg-[var(--champagne)] px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-40">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--gold)]/35 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full bg-[var(--purple)]/15 blur-3xl" />
        <SiteNav light />
        <div className="relative mx-auto grid max-w-[1320px] items-end gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-24">
          <div><div className="flex items-center gap-4"><p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--purple)]">A little space to reset</p><span className="h-px w-16 bg-[var(--purple)]" /></div><h1 className="mt-6 max-w-4xl text-6xl leading-[0.9] sm:text-7xl lg:text-[7.2rem]">Make the ride your own.</h1></div>
          <p className="max-w-md pb-2 text-lg leading-8 text-[var(--slate)]">Color, notice, explore, and find a small way to make the miles feel like yours. No score required.</p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28"><div className="mx-auto max-w-[1320px]"><div className="flex items-end justify-between gap-6 border-b border-[var(--navy)]/15 pb-7"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--purple)]">Choose your reset</p><h2 className="mt-3 text-4xl sm:text-5xl">Make something. Notice something.</h2></div><p className="hidden max-w-xs text-sm leading-6 text-[var(--slate)] sm:block">A little creativity goes a long way between rehearsal and the stadium.</p></div><div className="mt-8 grid gap-6 lg:grid-cols-2">{activities.map((activity, index) => <Link href={activity.href} key={activity.title} className="group relative min-h-[510px] overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(7,26,47,0.1)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(7,26,47,0.16)]"><div className={`absolute inset-0 ${activity.tone}`}><Image src={activity.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-90 transition duration-700 group-hover:scale-105" /></div><div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,47,0.96)] via-[rgba(7,26,47,0.24)] to-transparent" /><div className="relative flex min-h-[510px] flex-col justify-between p-6 text-white sm:p-9"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-sm font-black text-[var(--navy)]">0{index + 1}</span><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--champagne)]">{activity.eyebrow}</p><h3 className="mt-4 max-w-xl text-4xl leading-[0.95] sm:text-5xl">{activity.title}</h3><p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base">{activity.description}</p><span className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-bold text-[var(--navy)]">Open activity <ArrowIcon /></span></div></div></Link>)}</div></div></section>

      <section className="bg-[var(--navy)] px-6 py-14 text-white sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--gold)]">No pressure, just passing time</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">Pick what feels good today.</h2></div><Link href="/play" className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--champagne)]">Try a game <ArrowIcon /></Link></div></section>
    </main>
  );
}
