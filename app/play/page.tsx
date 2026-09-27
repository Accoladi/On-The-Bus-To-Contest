import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

const games = [
  { number: "01", title: "Name That Marching Band Tune", eyebrow: "Music challenge", description: "Listen to a short marching band tune and pick the correct song from four choices.", image: "/content/images/home/games/name-that-tune.png", href: "/play/name-that-tune", panel: "bg-[var(--purple)]" },
  { number: "02", title: "Marching Band Terms Crossword", eyebrow: "Word game", description: "Test your marching band vocabulary with easy, medium, and challenging puzzles.", image: "/content/images/games/marching-band-crossword.png", href: "/play/marching-band-crossword", panel: "bg-[var(--navy)]" },
  { number: "03", title: "Name That College", eyebrow: "Music trivia", description: "Hear a college fight song and guess the school from four choices.", image: "/content/images/games/name-that-college.png", href: "/play/college-fight-songs", panel: "bg-[#9c6a1d]" },
  { number: "04", title: "The Dodging Judge", eyebrow: "Endless runner", description: "Sprint down the field, dodge the judge, and collect music notes along the way.", image: "/content/images/home/games/the-dodging-judge.png", href: "/play/halftime-hustle", panel: "bg-[#355d59]" },
  { number: "05", title: "Tic Tap Tone", eyebrow: "Play with a friend", description: "A musical take on tic-tac-toe with trombones and drums instead of Xs and Os.", image: "/content/images/games/tic-tap-tone.png", href: "/play/tic-tac-toe", panel: "bg-[var(--purple)]" },
  { number: "06", title: "Marching Band Trivia", eyebrow: "Test your knowledge", description: "Challenge your band knowledge, musical memory, and competition instincts.", image: "/content/images/games/marching-band-trivia.png", href: "/play/trivia", panel: "bg-[var(--navy)]" },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function PlayPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--navy)]">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16 lg:pb-24 lg:pt-40">
        <Image src="/images/games/bg.png" alt="" fill sizes="100vw" priority className="z-0 object-cover object-center" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(105deg,rgba(7,26,47,.82)_0%,rgba(7,26,47,.58)_45%,rgba(7,26,47,.42)_100%)]" />
        <SiteNav />
        <div className="relative z-10 mx-auto max-w-[1320px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4"><p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Make the miles fly</p><span className="h-px w-16 bg-[var(--gold)]" /></div>
            <h1 className="mt-6 text-6xl leading-[0.9] sm:text-7xl lg:text-[7.2rem]">Settle the bus debate.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">Quick games, friendly competition, and just enough marching-band trivia to settle the debate across the aisle.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-5 border-b border-[var(--navy)]/10 pb-7 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--purple)]">Choose your challenge</p><h2 className="mt-3 text-4xl sm:text-5xl">Something for every stretch of road.</h2></div><p className="max-w-sm text-sm leading-6 text-[var(--slate)]">Play solo, compare answers with your seatmate, or keep a quiet score in your head.</p></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => <Link href={game.href} key={game.title} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_14px_38px_rgba(7,26,47,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(7,26,47,0.15)]">
              <div className={`relative aspect-[1.1] overflow-hidden ${game.panel}`}><Image src={game.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[var(--navy)]">{game.number}</span></div>
              <div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">{game.eyebrow}</p><h3 className="mt-3 text-3xl leading-[0.98]">{game.title}</h3><p className="mt-4 text-sm leading-6 text-[var(--slate)]">{game.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold">Play now <span className="transition group-hover:translate-x-1"><ArrowIcon /></span></span></div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--gold)] px-6 py-14 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--navy)]/65">Need a reset?</p><h2 className="mt-2 text-4xl leading-none sm:text-5xl">Take the low-stakes route.</h2></div><Link href="/activities" className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--navy)] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--purple)]">Try an activity <ArrowIcon /></Link></div></section>
    </main>
  );
}
