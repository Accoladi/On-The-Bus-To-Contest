import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Gamepad2, Palette, Search, Sparkles, Users } from 'lucide-react';
import PartnersSection from '../PartnersSection';

const partners = [
  { name: 'Accoladi', image: '/images/accolad-banner.png', href: 'https://www.accoladi.com/' },
  { name: 'My Music Future', image: '/images/my-music-future-logo.png', href: 'https://mymusicfuture.com/' },
  { name: 'NSMA', image: '/images/nsma-footer.png', href: 'https://www.nsma.us/' },
];

export default function ActivitiesPage() {
  return <div className="bg-[#F7F5F0] text-[#071D35]">
    <section className="relative isolate min-h-[calc(100svh-61px)] overflow-hidden border-y border-[#D6A62E] bg-[#06182B] text-white">
      <div className="absolute inset-0 -z-30 bg-cover bg-[64%_center] lg:bg-[70%_42%]" style={{ backgroundImage: "url('/images/coloring-book.jpg')" }} />
      <div className="absolute inset-0 -z-20" style={{ background: 'linear-gradient(90deg,#06182B 0%,rgba(6,24,43,.96) 30%,rgba(6,24,43,.55) 58%,rgba(6,24,43,.08) 100%)' }} />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(214,166,46,.25)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="mx-auto flex min-h-[calc(100svh-61px)] max-w-[1440px] items-center px-7 py-16 sm:px-12 lg:px-20">
        <div className="max-w-[560px]"><Palette className="mb-5 border border-[#D6A62E] p-2 text-[#D6A62E]" size={58} strokeWidth={1.4} /><h1 className="font-display font-black uppercase text-white" style={{ margin: 0, fontSize: 'clamp(4.5rem, 9vw, 8rem)', lineHeight: '.82' }}>Activities</h1><div className="mt-5 flex items-center gap-3"><span className="h-px w-28 bg-[#D6A62E]" /><Sparkles size={17} className="text-[#D6A62E]" /><span className="h-px w-20 bg-[#D6A62E]" /></div><p className="mt-6 text-base font-bold sm:text-lg">Make something. Find something. Have fun.</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">Hands-on activities built for the time between performances.</p><div className="mt-10 flex flex-wrap gap-3"><a href="#activities" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#D6A62E] px-6 text-[10px] font-black uppercase text-[#06182B] shadow-[0_12px_30px_rgba(214,166,46,.22)] transition hover:-translate-y-0.5">Explore activities <ArrowRight size={15} /></a><span className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-5 text-[10px] font-black uppercase text-white/75">2 ways to play</span></div></div>
      </div>
      <a href="#activities" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-white/65 sm:flex">Scroll to explore <span className="grid size-9 place-items-center rounded-full border border-[#D6A62E]/70 text-[#D6A62E]"><ArrowRight className="rotate-90" size={15} /></span></a>
    </section>

    <main id="activities" className="mx-auto max-w-[1120px] space-y-6 px-5 py-12 sm:px-8 lg:px-12">
      <article className="grid min-h-[330px] overflow-hidden border border-[#D6A62E]/20 bg-[#FCF8EE] shadow-[0_5px_20px_rgba(6,24,43,.08)] lg:grid-cols-2">
        <div className="min-h-[270px] bg-cover bg-center" style={{ backgroundImage: "url('/images/coloring-book.jpg')" }} />
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-9 sm:px-12"><div className="absolute -right-8 -top-8 size-52 rotate-12 bg-[#D6A62E]/[.06]" /><p className="relative text-[10px] font-black uppercase tracking-[.1em] text-[#C52B30]">01 / Create</p><h2 className="relative mt-2 font-display text-5xl font-black leading-none">Coloring Book</h2><span className="relative mt-3 h-0.5 w-12 bg-[#D6A62E]" /><p className="relative mt-4 max-w-md text-[12px] leading-relaxed text-[#33465A]">Unleash your creativity with our marching band coloring book. Fill the pages with color and bring the excitement of performance to life.</p><Link to="/coloringbookoptions" className="relative mt-6 inline-flex w-fit items-center gap-4 text-[10px] font-black uppercase text-[#C52B30]">Start Coloring <ArrowRight size={15} /></Link></div>
      </article>

      <article className="grid min-h-[330px] overflow-hidden border border-[#D6A62E]/30 bg-[#071D35] text-white shadow-[0_5px_20px_rgba(6,24,43,.14)] lg:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-9 sm:px-12"><Search className="absolute -bottom-8 -left-8 text-white/[.035]" size={240} strokeWidth={.7} /><p className="relative text-[10px] font-black uppercase tracking-[.1em] text-[#D6A62E]">02 / Find</p><h2 className="relative mt-2 font-display text-5xl font-black leading-none">Scavenger Hunt</h2><span className="relative mt-3 h-0.5 w-12 bg-[#D6A62E]" /><p className="relative mt-4 max-w-md text-[12px] leading-relaxed text-white/75">Explore, discover, and have a blast. Find all the hidden items around the band and check them off your list. How fast can you complete the hunt?</p><Link to="/scavengerhunt" className="relative mt-6 inline-flex w-fit items-center gap-4 text-[10px] font-black uppercase text-[#E6B72F]">Start Searching <ArrowRight size={15} /></Link></div>
        <div className="min-h-[270px] bg-cover bg-center" style={{ backgroundImage: "url('/images/scavenger.png')" }} />
      </article>

      <section className="border border-[#D6A62E]/15 bg-[#F1EDE4] px-5 py-4"><div className="mb-3 flex items-center justify-center gap-4"><span className="h-px w-24 bg-[#D6A62E]/60" /><h2 className="text-xs font-black uppercase tracking-wide">More ways to pass the time</h2><span className="h-px w-24 bg-[#D6A62E]/60" /></div><div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2"><Link to="/games" className="flex min-h-12 items-center justify-center gap-5 text-sm font-semibold transition hover:bg-white/60"><Gamepad2 className="text-[#315F91]" size={23} />Play Games <ArrowRight className="text-[#C52B30]" size={16} /></Link><Link to="/articlespage" className="flex min-h-12 items-center justify-center gap-5 text-sm font-semibold transition hover:bg-white/60"><BookOpen className="text-[#315F91]" size={23} />Read Stories <ArrowRight className="text-[#C52B30]" size={16} /></Link></div></section>
    </main>

    <PartnersSection />
  </div>;
}
