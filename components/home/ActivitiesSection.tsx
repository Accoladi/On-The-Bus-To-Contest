import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    number: "01",
    eyebrow: "Coloring pages",
    title: "Coloring on the Road",
    description: "A creative reset for the moments when you want your hands busy and your mind somewhere else.",
    image: "/content/images/coloring-book.jpg",
    alt: "Colorful pencils and marching band performers",
    href: "/activities/coloring",
  },
  {
    number: "02",
    eyebrow: "Scavenger hunt",
    title: "Bus Ride Scavenger Hunt",
    description: "A playful list of things to spot, notice, and share before the bus reaches the stadium.",
    image: "/content/images/entertainment/scavenger.png",
    alt: "Illustrated marching band scavenger hunt",
    href: "/activities/scavenger-hunt",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export function ActivitiesSection() {
  return (
    <section id="activities" className="relative isolate overflow-hidden bg-[var(--navy)] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <Image src="/images/home/activities/ChatGPT Image Sep 26, 2026, 12_58_22 AM.png" alt="" fill sizes="100vw" className="-z-10 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[rgba(7,26,47,0.12)]" />

        <div className="relative mx-auto grid max-w-[1390px] gap-10 lg:grid-cols-[minmax(390px,0.95fr)_minmax(0,1.45fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="max-w-[390px] lg:pb-5">
          <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]"><span>Activities</span><span className="h-px w-10 bg-[var(--gold)]" /></div>
          <h2 className="mt-7 max-w-[410px] text-5xl leading-[0.94] sm:text-6xl lg:max-w-[370px] lg:text-[4.5rem] xl:text-[5.15rem]">Make the Ride Your Own</h2>
          <p className="mt-7 max-w-[350px] text-base leading-7 text-white/75 sm:text-lg">Students can explore, create, and reset while the bus rolls toward the contest and the band gets ready for the field.</p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--gold)] px-5 py-3 text-sm font-semibold text-[var(--gold)]"><span aria-hidden="true" className="text-xl leading-none">☆</span>2 activities available</div>
          <Link href="/activities" className="mt-7 flex w-fit items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--champagne)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">Explore All Activities <ArrowIcon /></Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {activities.map((activity) => (
            <Link href={activity.href} key={activity.title} className="group relative min-h-[590px] overflow-hidden rounded-[20px] border-[3px] border-[var(--gold)] bg-[rgba(7,26,47,0.72)] shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.35)] sm:min-h-[625px]">
              <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden"><Image src={activity.image} alt={activity.alt} fill sizes="(max-width: 640px) 100vw, 42vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,26,47,0.96)]" /></div>
              <div className="relative flex min-h-[590px] flex-col justify-between p-6 sm:min-h-[625px] sm:p-7 lg:p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-base font-bold text-[var(--navy)]">{activity.number}</span>
                <div className="mt-auto pt-48"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{activity.eyebrow}</p><h3 className="mt-4 text-3xl leading-[0.98] sm:text-4xl lg:text-[2.65rem]">{activity.title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/75 sm:text-base">{activity.description}</p><span className="mt-6 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--navy)] transition group-hover:bg-[var(--champagne)]">Open Activity <ArrowIcon /></span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
