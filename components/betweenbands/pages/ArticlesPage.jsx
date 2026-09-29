import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText, Star } from 'lucide-react';
import articles from '../articleData';

const routes = {
  1: '/marchingBandWhereExcellenceAndSuccessUnite', 2: '/symphonyOfAspirations',
  3: '/harmonizingHearts', 4: '/marchingBandsUnveilingTheRhythmOfStyle',
  5: '/historyOfMarchingBands', 6: '/winnersOfThePast', 7: '/MarchingBandAFusion',
  8: '/nextSaturday', 9: '/marchingToSuccess', 10: '/crackingTheCode',
  11: '/aSymphonyofSupport', 12: '/marchingContests', 13: '/marchingBandJokes',
  14: '/evolutionOfMarchingBandUniforms', 15: '/recipes',
  16: '/whosWhoOnTheMarchingBandField', 17: '/whatHappensBeforeABandTakesTheField',
  18: '/fromMarchingBandToMilitaryBand', 19: '/whyAreTheBandsInDifferentClasses',
};

const editorial = {
  1: ['Band Life', 'Discover the many roles that come together to create an unforgettable performance.'],
  2: ['Performance', 'A journey through music, camaraderie, and achieving excellence both on and off the field.'],
  3: ['Inspiration', 'The inspiring role of the audience in a marching band contest.'],
  4: ['Style', 'Exploring the unique sounds, looks, and traditions that set every band apart.'],
  5: ['History', 'A look back at the rich heritage and evolution of marching bands in America.'],
  6: ['Celebrity', 'Famous faces who were once part of a marching band.'],
  16: ['Band Life', 'Meet the people who turn a field into a full production.'],
  17: ['Behind the Scenes', 'What happens before the first note reaches the stands.'],
  18: ['Music Careers', 'How marching-band musicians can explore military music.'],
  19: ['Competition', 'Why bands compete in different classifications.'],
};

const PAGE_SIZE = 6;

export default function ArticlesPage() {
  const [page, setPage] = useState(1);
  const articleOrder = [1, 3, 4, 18, 6, 9, 11, 12, 17, 16, 19, 10, 7, 14, 2, 13, 15, 8];
  const orderedArticles = articleOrder.map((id) => articles.find((article) => article.id === id));
  const totalPages = Math.ceil(orderedArticles.length / PAGE_SIZE);
  const visible = orderedArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const changePage = (next) => {
    setPage(Math.min(totalPages, Math.max(1, next)));
    window.requestAnimationFrame(() => document.getElementById('article-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <div className="bg-white text-[#06182B]">
    <section className="relative isolate min-h-[510px] overflow-hidden bg-[#F4F0E8] sm:min-h-[550px] lg:min-h-[590px]">
      <div className="absolute inset-0 -z-20 bg-[#06182B]" />
      <div className="absolute inset-0 -z-10">
        <img src="/images/articles/hero-bg.png" alt="Marching band performing under stadium lights" className="size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06182B]/90 via-[#06182B]/45 to-[#06182B]/10" />
      </div>
      <div className="mx-auto flex min-h-[510px] max-w-[1440px] items-center px-7 pb-20 pt-12 sm:min-h-[550px] sm:px-14 lg:min-h-[590px] lg:px-24">
        <div className="relative z-10 max-w-[520px] text-center text-white">
          <div className="mx-auto grid size-[70px] place-items-center rounded-full border border-[#D6A62E] text-[#D6A62E]"><FileText size={36} strokeWidth={1.35} /></div>
          <h1 className="mt-5 font-display text-[68px] font-black uppercase leading-none tracking-[.06em] sm:text-[84px] lg:text-[96px]">Articles</h1>
          <div className="mt-5 flex items-center justify-center gap-5 text-[#D6A62E]"><span className="h-px w-32 bg-[#D6A62E]" /><Star size={22} fill="currentColor" /><span className="h-px w-32 bg-[#D6A62E]" /></div>
          <p className="mx-auto mt-6 max-w-[520px] text-lg leading-relaxed sm:text-xl">For Contest Fans in the Stands. <br/>Stories, Insight, and Inspiration.</p>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 h-[125px] w-full" viewBox="0 0 1440 125" preserveAspectRatio="none" aria-hidden="true">
        <path d="M430 106C845 112 1170 73 1440 4V70C1100 118 770 128 430 106Z" fill="#0A2340" />
        <path d="M610 118C980 118 1240 92 1440 63V79C1190 118 900 127 610 118Z" fill="#C52B30" />
        <path d="M0 74C295 120 565 126 800 118C520 135 260 124 0 88Z" fill="#FFFFFF" />
      </svg>
    </section>

    <section id="article-grid" className="scroll-mt-20 px-6 pb-8 pt-12 sm:px-10 lg:px-16 lg:pt-14">
      <div className="mx-auto grid max-w-[1300px] gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => {
          const [category, description] = editorial[article.id] || ['Marching Band', article.subtitle];
          return <article key={article.id} className="group flex min-h-[475px] flex-col overflow-hidden rounded-[3px] border border-black/5 bg-white shadow-[0_6px_20px_rgba(6,24,43,.13)]">
            <Link to={routes[article.id]} className="block h-[225px] overflow-hidden">
              <img src={`/${article.image.replace(/^\//, '')}`} alt="" className="size-full object-cover transition duration-500 group-hover:scale-[1.035]" />
            </Link>
            <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
              <p className="text-[11px] font-black uppercase tracking-wide text-[#C52B30]">{category}</p>
              <h2 className="mt-3 text-[19px] font-extrabold leading-tight text-[#06182B]">{article.title}</h2>
              <div className="mt-3 h-px w-7 bg-[#D6A62E]" />
              <p className="mt-4 text-sm leading-relaxed text-[#25364a]">{description}</p>
              <Link to={routes[article.id]} className="mt-auto flex items-center gap-3 pt-6 text-sm font-extrabold uppercase tracking-wide text-[#B62227]">Read More <ArrowRight size={17} /></Link>
            </div>
          </article>;
        })}
      </div>
      <nav aria-label="Article pages" className="mx-auto mt-8 flex w-fit items-center gap-6">
        <button onClick={() => changePage(page - 1)} disabled={page === 1} aria-label="Previous page" className="disabled:opacity-30"><ArrowLeft size={18} /></button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => <button key={number} onClick={() => changePage(number)} className={`grid size-9 place-items-center rounded-full text-sm font-bold ${number === page ? 'bg-[#06182B] text-white' : 'text-[#06182B]'}`}>{number}</button>)}
        <button onClick={() => changePage(page + 1)} disabled={page === totalPages} aria-label="Next page" className="disabled:opacity-30"><ArrowRight size={18} /></button>
      </nav>
    </section>

  </div>;
}
