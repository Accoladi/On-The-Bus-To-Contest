export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          On the Bus to Contest
        </p>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--muted)]">
          Coming together
        </span>
      </header>

      <section className="max-w-3xl py-24">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          Your contest-day companion
        </p>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          Make the ride part of the show.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
          Games, stories, music, and useful contest-day resources for the people who make marching band happen.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a className="rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-slate-950 transition hover:bg-white" href="#explore">
            Explore the experience
          </a>
          <a className="rounded-full border border-white/20 px-6 py-3 font-bold transition hover:border-white" href="mailto:hello@example.com">
            Get involved
          </a>
        </div>
      </section>

      <section id="explore" className="grid gap-4 pb-8 sm:grid-cols-3">
        {["Play", "Listen", "Learn"].map((label, index) => (
          <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-[var(--accent)]">0{index + 1}</p>
            <h2 className="mt-8 text-2xl font-bold">{label}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              A space for the next layer of the contest-day experience.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
