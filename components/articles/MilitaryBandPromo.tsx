import Image from "next/image";

export function MilitaryBandPromo() {
  return (
    <aside className="mt-14 overflow-hidden rounded-2xl border border-[var(--navy)]/15 bg-[var(--navy)] text-white shadow-[0_16px_38px_rgba(7,26,47,.18)]" aria-label="From Marching Band to a United States Military Band">
      <a href="/fromMarchingBandToMilitaryBand" className="group relative block min-h-[360px] overflow-hidden">
        <Image src="/images/articles/article-title-bgs/marchingband-militaryband.png" alt="From Marching Band to a United States Military Band" fill sizes="(max-width: 768px) 100vw, 760px" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,18,38,.96),rgba(3,18,38,.2)_72%,rgba(3,18,38,.05))]" />
        <div className="relative flex min-h-[360px] flex-col justify-end p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Keep exploring</p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl leading-[1.02] sm:text-4xl">From Marching Band to a United States Military Band</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">Discover how marching-band musicians can build a future in professional military music.</p>
          <span className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)]">Read the article <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </aside>
  );
}
