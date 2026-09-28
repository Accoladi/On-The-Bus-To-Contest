import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

const contentAreas = [
  { icon: "▱", title: "Articles", text: "Stories, advice, and fresh perspectives from the band world." },
  { icon: "⌁", title: "Games", text: "Fun ways to pass the time between performances." },
  { icon: "♫", title: "Activities", text: "Things to do on the bus with your section or the whole band." },
  { icon: "▤", title: "Books", text: "Longer reads for the ride, from real stories to inspiration." },
  { icon: "◉", title: "Radio", text: "A soundtrack for the road." },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] ${light ? "text-[var(--gold)]" : "text-[var(--navy)]"}`}>
      <span className="h-px w-8 bg-[var(--gold)]" />
      <span>{children}</span>
    </div>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--navy)]">
      <section className="relative isolate min-h-[600px] overflow-hidden bg-[var(--navy)] text-white sm:min-h-[680px] lg:min-h-[720px]">
        <Image src="/images/about/hero-bg.png" alt="Marching band students riding together on a bus at sunset" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,38,.95)_0%,rgba(3,18,38,.8)_40%,rgba(3,18,38,.18)_78%,rgba(3,18,38,.1)_100%)]" />
        <SiteNav />
        <div className="relative mx-auto flex min-h-[600px] max-w-[1320px] items-center px-6 pb-20 pt-32 sm:min-h-[680px] sm:px-10 lg:min-h-[720px] lg:px-16">
          <div className="max-w-xl">
            <Eyebrow light>About</Eyebrow>
            <h1 className="mt-7 text-6xl leading-[.9] sm:text-7xl lg:text-[6.5rem]">More Than<br /><span className="text-[var(--gold)]">a Ride.</span></h1>
            <p className="mt-8 max-w-md text-base leading-7 text-white/80 sm:text-lg">On the Bus to Contest is a place for the moments in between — the music, the friends, the stories, and everything that makes the bus ride part of the experience.</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[-1px] h-16 rounded-[50%_50%_0_0/100%_100%_0_0] bg-[var(--cream)]" />
      </section>

      <section className="relative bg-[var(--cream)] px-6 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 md:grid-cols-[1.05fr_.95fr] md:gap-8 lg:gap-16">
          <div className="relative rotate-[-1deg] overflow-hidden rounded-[4px] border-[10px] border-white bg-white shadow-[0_18px_35px_rgba(7,26,47,.16)] sm:border-[14px]">
            <div className="relative aspect-[1.28]">
              <Image src="/images/about/story-bg.png" alt="Marching band students laughing together beside the bus" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
          <div className="max-w-xl md:py-4 lg:py-10">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-6 text-5xl leading-[.92] sm:text-6xl md:text-[3.35rem] lg:text-6xl">It Started<br />on the Bus.</h2>
            <div className="mt-7 space-y-5 text-base leading-7 text-[var(--slate)] sm:text-lg md:text-[0.96rem] md:leading-6 lg:text-lg lg:leading-7">
              <p>Every contest day begins the same way — loading instruments, finding your seat, and hitting the road with your friends. The bus ride is filled with excitement, nerves, music, inside jokes, and memories that last long after the final performance.</p>
              <p>On the Bus to Contest was created to celebrate that part of the journey. It’s a space for students to relax, be inspired, have fun, and feel connected before they step onto the field.</p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[-34px] h-16 rounded-[0_0_50%_50%/0_0_100%_100%] bg-[var(--navy)]" />
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
        <Image src="/images/about/mission.png" alt="A bus traveling toward a sunset" fill sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,38,.98)_0%,rgba(3,18,38,.87)_42%,rgba(3,18,38,.15)_100%)]" />
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-xl">
            <Eyebrow light>Our mission</Eyebrow>
            <h2 className="mt-7 text-5xl leading-[.94] sm:text-6xl">Make the Time<br />Between Performances<br /><span className="text-[var(--gold)]">Part of the Experience.</span></h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/78 sm:text-lg">We believe that the hours before you arrive at the contest matter. They’re filled with learning, laughter, creativity, and community. Our mission is to give marching band students a place to connect with content made just for them — from articles and games to activities, books, and music.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <Eyebrow>What you’ll find here</Eyebrow>
          <h2 className="mx-auto mt-7 max-w-2xl text-center text-4xl leading-[.95] sm:text-5xl">Content for Every Stop<br />Along the Way.</h2>
          <div className="mt-12 grid divide-y divide-[var(--gold)]/35 border-y border-[var(--gold)]/35 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {contentAreas.map((area) => (
              <div key={area.title} className="px-5 py-8 text-center sm:px-6 lg:py-10">
                <div className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--gold)]" aria-hidden="true">{area.icon}</div>
                <h3 className="mt-5 text-2xl">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--slate)]">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[430px] overflow-hidden bg-[var(--navy)] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <Image src="/images/about/quote-bg.png" alt="Instruments and students on the bus at sunset" fill sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,38,.3),rgba(3,18,38,.08))]" />
        <div className="mx-auto flex max-w-[1320px] justify-end">
          <blockquote className="max-w-md rounded-[24px] bg-[rgba(255,255,255,.9)] p-8 text-[var(--navy)] shadow-[0_20px_55px_rgba(7,26,47,.2)] sm:p-10">
            <span className="font-[family-name:var(--font-display)] text-6xl leading-none text-[var(--gold)]">“</span>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl italic leading-tight sm:text-3xl">The bus ride isn’t just time between performances. It’s where friendships grow, nerves turn into excitement, and memories are made.</p>
          </blockquote>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--cream)] px-6 py-20 text-center sm:px-10 sm:py-28 lg:px-16">
        <div className="absolute -left-20 top-16 text-[9rem] leading-none text-[var(--gold)]/10" aria-hidden="true">♫</div>
        <div className="absolute -right-12 bottom-4 rotate-12 text-[10rem] leading-none text-[var(--gold)]/10" aria-hidden="true">♫</div>
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow>A community on the move</Eyebrow>
          <h2 className="mt-7 text-4xl leading-[.95] sm:text-5xl">For Every Marching Band Student.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--slate)] sm:text-lg">Whether it’s your first contest or your last, whether you’re a freshman or a senior, whether you’re a musician, color guard member, or part of the drumline — you’re part of the same journey. On the Bus to Contest is for every student who loves the energy, the challenges, and the unforgettable experience of marching band.</p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-6 py-24 text-center text-white sm:px-10 sm:py-32 lg:px-16">
        <Image src="/images/about/hero-bg.png" alt="Marching band students arriving at the stadium" fill sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[rgba(3,18,38,.64)]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl leading-none sm:text-5xl">Let’s Keep the Journey Going.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Explore articles, games, activities, books, and more — because the ride to the contest is part of the story.</p>
          <Link href="/" className="mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--champagne)]">Explore On the Bus to Contest <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
