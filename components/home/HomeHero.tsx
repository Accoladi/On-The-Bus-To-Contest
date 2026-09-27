import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[var(--navy)] text-white lg:min-h-screen" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-20 bg-[url('/images/home/hero/bg.png')] bg-cover bg-[center_58%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,47,0.98)_0%,rgba(7,26,47,0.84)_25%,rgba(7,26,47,0.32)_56%,rgba(7,26,47,0.08)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,26,47,0.54)_0%,transparent_28%,rgba(7,26,47,0.18)_70%,rgba(7,26,47,0.4)_100%)]" />

      <SiteNav />

      <div className="mx-auto flex min-h-[760px] max-w-[1440px] items-end px-6 pb-12 pt-32 sm:pb-16 lg:min-h-screen lg:items-center lg:px-[58px] lg:pb-0 lg:pt-[76px]">
        <div className="max-w-[650px]">
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)] sm:text-[15px]">
            Your contest day starts before the stadium
          </p>
          <h1 id="hero-title" className="max-w-[630px] text-[clamp(3.35rem,6.3vw,6.4rem)] leading-[0.93] tracking-[-0.035em] text-white">
            The Ride Is Part
            <br />
            of the <span className="text-[var(--gold)]">Experience.</span>
          </h1>
          <p className="mt-7 max-w-[550px] text-[clamp(1rem,1.8vw,1.42rem)] leading-[1.35] text-white/85">
            Read. Listen. Play. Laugh. Reset.
            <br className="hidden sm:block" />
            Whatever you need before you step off the bus.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/the-ride" className="flex items-center gap-3 rounded-full bg-[var(--gold)] px-7 py-4 text-[16px] font-bold text-[var(--navy)] shadow-[0_8px_24px_rgba(231,184,75,0.28)] transition hover:bg-[var(--champagne)]">
              Start the Ride <ArrowIcon />
            </Link>
            <Link href="/calm" className="rounded-full border border-[var(--gold)] px-7 py-4 text-[16px] font-semibold text-white transition hover:bg-white/10">
              Calm My Nerves
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
