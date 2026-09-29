import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

const activities = [
  { eyebrow: "Color and make", title: "Coloring on the road", description: "A quiet creative reset for the moments when you want your hands busy and your mind somewhere else.", image: "/content/images/coloring-book.jpg", href: "/activities/coloring" },
  { eyebrow: "Look a little closer", title: "Bus ride scavenger hunt", description: "A playful list of things to spot, notice, and share before the bus reaches the stadium.", image: "/content/images/scavenger.png", href: "/activities/scavenger-hunt" },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--navy)]">
      <section className="relative isolate min-h-[520px] overflow-hidden bg-[var(--navy)] text-[var(--cream)] sm:min-h-[590px] lg:min-h-[650px]">
        <Image src="/images/activities/hero-bg.png" alt="A student drawing on the bus during the ride to contest" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,47,.95)_0%,rgba(7,26,47,.84)_38%,rgba(7,26,47,.58)_70%,rgba(7,26,47,.38)_100%)]" />
        <SiteNav solid />
        <div className="relative mx-auto flex min-h-[520px] max-w-[1320px] items-center px-6 pb-14 pt-32 sm:min-h-[590px] sm:px-10 sm:pb-20 lg:min-h-[650px] lg:px-16 lg:pt-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]"><span>A little space to reset</span><span className="h-px w-16 bg-[var(--gold)]" /></div>
            <h1 className="mt-7 max-w-3xl text-6xl leading-[.88] sm:text-7xl lg:text-[6.7rem]">Make the ride<br />your own.</h1>
            <div className="mt-4 h-3 w-80 rounded-[50%] border-t-[5px] border-[var(--gold)]/80 rotate-[-2deg] sm:w-[29rem]" />
            <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-lg">Color, notice, explore, and find a small way to make the miles feel yours. No score required.</p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--cream)] px-6 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(231,184,75,.12),transparent_65%)]" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--purple)]"><span>Choose your reset</span><span className="h-px w-12 bg-[var(--purple)]" /></div><h2 className="mt-5 text-4xl leading-[.95] sm:text-5xl lg:text-6xl">Make something. Notice something.</h2></div>
            <p className="max-w-xs text-base leading-7 text-[var(--slate)]">A little creativity goes a long way between rehearsal and the stadium.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {activities.map((activity, index) => <Link href={activity.href} key={activity.title} className="group relative min-h-[500px] overflow-hidden rounded-[25px] bg-[var(--navy)] shadow-[0_18px_45px_rgba(7,26,47,.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(7,26,47,.23)] sm:min-h-[560px]">
              <Image src={activity.image} alt={activity.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,47,.98)] via-[rgba(7,26,47,.35)] to-transparent" />
              <div className="relative flex min-h-[500px] flex-col justify-between p-6 text-white sm:min-h-[560px] sm:p-9">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-base font-bold text-[var(--navy)]">0{index + 1}</span>
                <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--gold)]">{activity.eyebrow}</p><h3 className="mt-4 max-w-2xl text-4xl leading-[.92] sm:text-5xl lg:text-[3.25rem]">{activity.title}</h3><p className="mt-5 max-w-xl text-base leading-7 text-white/85">{activity.description}</p><span className="mt-7 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-bold text-[var(--navy)] transition group-hover:bg-[var(--champagne)]">Open activity <ArrowIcon /></span></div>
              </div>
            </Link>)}
          </div>
        </div>
      </section>
    </main>
  );
}
