import Image from "next/image";
import Link from "next/link";

const games = [
  { title: "Name That Tune", type: "Music challenge", image: "/content/images/games/name-that-tune.png", href: "/play/name-that-tune", tone: "bg-[var(--purple)]" },
  { title: "Marching Band Trivia", type: "Test your knowledge", image: "/content/images/games/marching-band-trivia.png", href: "/play/trivia", tone: "bg-[var(--navy)]" },
  { title: "College Fight Songs", type: "Puzzle challenge", image: "/content/images/games/name-that-college.png", href: "/play/college-fight-songs", tone: "bg-[#9c6a1d]" },
];

export function GamesSection() {
  return (
    <section id="games" className="scroll-mt-8 bg-[var(--cream)] px-6 py-20 text-[var(--navy)] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.72fr_1.9fr] lg:items-end lg:gap-12 xl:gap-16">
        <div className="max-w-[360px]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--purple)]">Make the miles fly</p>
            <h2 className="mt-4 text-5xl leading-[0.96] sm:text-6xl lg:text-[4.6rem]">Beat the<br />Boredom.</h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[var(--slate)]">Quick solo games for the bus ride — name the tune, test your marching-band knowledge, and pass the time before you arrive.</p>
            <Link href="/play" className="mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-base font-bold text-[var(--navy)] shadow-[0_10px_24px_rgba(231,184,75,.24)] transition hover:-translate-y-0.5 hover:bg-[var(--champagne)] hover:shadow-[0_14px_30px_rgba(231,184,75,.32)]">See all games <span aria-hidden="true" className="text-xl leading-none">→</span></Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <Link key={game.title} href={game.href} className="group overflow-hidden rounded-[24px] bg-white shadow-[0_16px_40px_rgba(7,26,47,0.1)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(7,26,47,0.16)]">
              <div className={`relative aspect-[1.25] overflow-hidden ${game.tone}`}>
                <Image src={game.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--navy)]">0{index + 1}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--purple)]">{game.type}</p>
                <h3 className="mt-3 text-3xl">{game.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--navy)]">Play now <span className="transition group-hover:translate-x-1">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
