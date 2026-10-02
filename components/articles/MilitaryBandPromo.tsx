import Image from "next/image";

const militaryBands = [
  ["United State Army Band and Chorus", "https://usarmyband.com/"],
  ["United States Navy Band and Chorus", "https://www.navyband.navy.mil/"],
  ["United States Air Force Band", "https://www.music.af.mil/"],
  ["United States Coast Guard Band", "https://www.uscg.mil/Community/Coast-Guard-Band/"],
] as const;

function ExternalLinkIcon() {
  return <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5h5v5" /><path d="M19 5 11 13" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>;
}

export function MilitaryBandPromo() {
  return (
    <aside className="relative mt-14 min-h-[560px] overflow-hidden rounded-[24px] bg-[var(--navy)] font-[family-name:var(--font-body)] text-white shadow-[0_16px_38px_rgba(7,26,47,.18)] sm:min-h-[620px] lg:min-h-[695px]" aria-label="Music careers">
      <Image src="/content/images/articles/articles-ads/marching-militaryband.png" alt="Military band uniform" fill sizes="(max-width: 768px) 100vw, 1180px" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,38,.98)_0%,rgba(3,18,38,.88)_38%,rgba(3,18,38,.52)_70%,rgba(3,18,38,.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_50%,rgba(34,58,85,.32),transparent_48%)]" />
      <div className="relative flex min-h-[560px] flex-col p-8 sm:min-h-[620px] sm:p-12 lg:min-h-[695px] lg:p-16">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--gold)]">Music careers</p>
        <h2 className="mt-7 max-w-[820px] text-4xl font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.5rem]">Would you like to know more about military musician opportunities?</h2>
        <div className="mt-10 grid max-w-[840px] gap-4 sm:mt-12">
          {militaryBands.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-[68px] items-center justify-between gap-4 rounded-[16px] border border-white/25 bg-[rgba(10,31,55,.68)] px-6 py-4 text-lg font-bold text-white shadow-[0_8px_25px_rgba(0,0,0,.12)] backdrop-blur-[2px] transition hover:border-[var(--gold)] hover:bg-[rgba(10,31,55,.84)] sm:min-h-[70px] sm:px-6 sm:text-xl"><span>{label}</span><span className="text-[var(--gold)] transition-transform group-hover:translate-x-1"><ExternalLinkIcon /></span></a>)}
        </div>
      </div>
    </aside>
  );
}
