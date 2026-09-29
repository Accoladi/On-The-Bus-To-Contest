import Image from "next/image";
import Link from "next/link";

const columns = [
  { title: "Play", links: [{ label: "All Games", href: "/play" }, { label: "Game Categories", href: "/play" }, { label: "Leaderboards", href: "/play" }] },
  { title: "Explore", links: [{ label: "All Articles", href: "/read" }, { label: "Trending", href: "/read" }, { label: "Topics", href: "/read" }] },
  { title: "Radio", links: [{ label: "Listen Live", href: "/listen" }, { label: "Between Bus Radio", href: "/listen" }, { label: "Latest Tracks", href: "/listen" }] },
  { title: "Activities", links: [{ label: "All Activities", href: "/activities" }, { label: "Coloring Book", href: "/activities/coloring" }, { label: "Scavenger Hunt", href: "/activities/scavenger-hunt" }] },
];

function SocialIcon({ children }: { children: React.ReactNode }) {
  return <span className="flex h-7 w-7 items-center justify-center text-[var(--gold)] transition hover:text-white">{children}</span>;
}

export function SiteFooter() {
  return (
    <footer className="bg-[#06182b] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16 lg:py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)_1.55fr] lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo/logo.png" alt="" width={58} height={58} className="h-14 w-14 object-contain" />
              <span className="font-display text-xl leading-[.9] text-white">On the Bus<br />to Contest</span>
            </Link>
            <p className="mt-6 max-w-[230px] text-xs leading-5 text-white/70">The home for band members and fans. Read, listen, play, and connect.</p>
            <div className="mt-6 flex gap-1" aria-label="Social links"><SocialIcon>◎</SocialIcon><SocialIcon>▶</SocialIcon><SocialIcon>◉</SocialIcon><SocialIcon>f</SocialIcon><SocialIcon>𝕏</SocialIcon></div>
          </div>

          {columns.map((column) => <div key={column.title}><p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--gold)]">{column.title}</p><nav aria-label={`${column.title} links`} className="mt-4 grid gap-3 text-xs text-white/75">{column.links.map((link) => <Link key={`${column.title}-${link.label}`} href={link.href} className="transition hover:text-[var(--gold)]">{link.label}</Link>)}</nav></div>)}

          <div><p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--gold)]">Stay in the know</p><p className="mt-4 max-w-xs text-xs leading-5 text-white/75">Get updates, new games, and exclusive content.</p><div className="mt-5 flex h-10 border border-white/30"><input aria-label="Email address" type="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-white/45" /><button type="button" aria-label="Subscribe" className="px-3 text-lg text-[var(--gold)] transition hover:text-white">→</button></div></div>
        </div>
      </div>
      <div className="border-t border-white/15"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 py-4 text-center text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-center sm:gap-5 sm:px-10 lg:px-16"><span>© {new Date().getFullYear()} On the Bus to Contest</span><span className="hidden sm:inline">·</span><Link href="/about" className="hover:text-white">Privacy</Link><span className="hidden sm:inline">·</span><Link href="/about" className="hover:text-white">Terms of Use</Link><span className="hidden sm:inline">·</span><Link href="/about" className="hover:text-white">Accessibility</Link></div></div>
    </footer>
  );
}
