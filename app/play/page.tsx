import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/navigation/SiteNav";

const games = [
  { number: "01", title: "Name That Tune", eyebrow: "Music challenge", description: "Listen closely, trust your first instinct, and see how quickly you can recognize the song.", image: "/content/images/games/name-that-tune.png", href: "/play/name-that-tune", panel: "bg-[var(--purple)]" },
  { number: "02", title: "Marching Band Trivia", eyebrow: "Test your knowledge", description: "A friendly mix of history, instruments, traditions, and the little details band people know best.", image: "/content/images/games/marching-band-trivia.png", href: "/play/trivia", panel: "bg-[var(--navy)]" },
  { number: "03", title: "College Fight Songs", eyebrow: "Puzzle challenge", description: "Follow the clues, name the school, and settle the fight-song debate across the aisle.", image: "/content/images/games/name-that-college.png", href: "/play/college-fight-songs", panel: "bg-[#9c6a1d]" },
  { number: "04", title: "Fight Song Crossword", eyebrow: "Take your time", description: "A slower, satisfying challenge for the ride when you want to put your band knowledge to work.", image: "/content/images/games/marching-band-crossword.png", href: "/play/fight-song-crossword", panel: "bg-[#355d59]" },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

export default function PlayPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--navy)]">
      <section className="relative overflow-hidden bg-[var(--navy)] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16 lg:pb-24 lg:pt-40">
        <div className="absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-[var(--purple)]/60 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-5rem] h-[25rem] w-[25rem] rounded-full bg-[var(--gold)]/15 blur-3xl" />
        <SiteNav />
        <div className="relative mx-auto max-w-[1320px]">
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
