import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Radio", href: "/listen" },
  { label: "Articles", href: "/read" },
  { label: "Games", href: "/play" },
  { label: "Activities", href: "/activities" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--navy)] text-white">
      <div className="absolute -right-24 -top-36 h-[28rem] w-[28rem] rounded-full bg-[var(--purple)]/35 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-48 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[var(--gold)]/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-6 pb-7 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pb-8">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-[var(--gold)]/80 via-white/15 to-transparent" />
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div className="max-w-xl">
            <Link href="/" className="group inline-flex items-center gap-4">
              <Image src="/images/logo/logo.png" alt="" width={78} height={78} className="h-[4.5rem] w-[4.5rem] object-contain drop-shadow-[0_8px_18px_rgba(231,184,75,.2)] transition duration-300 group-hover:-translate-y-1" />
              <span className="font-display text-2xl leading-none text-white/95 sm:text-3xl">On the Bus to Contest</span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">Read, listen, play, and find your rhythm on the ride to contest day.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-white/75 lg:justify-end">
            {footerLinks.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-[var(--gold)]">{link.label}</Link>)}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs tracking-[0.02em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>Made for the ride to contest day.</span>
          <span>© {new Date().getFullYear()} On the Bus to Contest</span>
        </div>
      </div>
    </footer>
  );
}
