"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { articleCatalog, type ArticleSummary } from "@/content/articles/articleCatalog";

const categoryStyles: Record<string, string> = {
  Mindset: "bg-[#5a2a78]",
  Confidence: "bg-[#b84138]",
  People: "bg-[#2c8b69]",
  Directors: "bg-[#a06b19]",
  Wellbeing: "bg-[#355d9b]",
  Community: "bg-[#2c8b69]",
  Preparation: "bg-[#355d9b]",
  Stories: "bg-[#a06b19]",
  "Band Culture": "bg-[#5a2a78]",
  "College & Scholarships": "bg-[#355d9b]",
  "Student Life": "bg-[#2c8b69]",
};

const filterLabels = ["All Articles", "Student Life", "Music & Performance", "Tips & How To", "College & Scholarships", "Stories", "Band Culture"];
const filterCategories: Record<string, string[]> = {
  "Student Life": ["People", "Stories", "Student Life"],
  "Music & Performance": ["Confidence", "Directors"],
  "Tips & How To": ["Mindset", "Confidence", "Directors", "Wellbeing"],
  "College & Scholarships": ["College & Scholarships", "Stories"],
  Stories: ["Stories"],
  "Band Culture": ["People", "Directors", "Band Culture"],
};
const ARTICLES_PER_PAGE = 6;

function ArrowIcon() { return <span aria-hidden="true" className="text-xl leading-none">→</span>; }

function CategoryBadge({ category }: { category: string }) {
  return <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm ${categoryStyles[category] || "bg-[var(--purple)]"}`}>{category}</span>;
}

function ArticleCard({ article }: { article: ArticleSummary }) {
  return <Link href={`/read/${article.slug}`} className="group relative h-full overflow-hidden rounded-xl border border-[var(--navy)]/8 bg-white shadow-[0_8px_22px_rgba(7,26,47,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,26,47,0.13)]"><div className="relative aspect-[1.68] overflow-hidden"><Image src={article.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /><CategoryBadge category={article.category} /></div><div className="flex min-h-[188px] flex-col p-5"><h2 className="text-[26px] leading-[0.98]">{article.title}</h2><p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--slate)]">{article.description}</p><div className="mt-auto flex items-center justify-between pt-5 text-xs text-[var(--slate)]"><span>{article.date} <span className="mx-1 text-[var(--gold)]">•</span> {article.readingTime}</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcecff] text-lg leading-none text-[var(--navy)] transition group-hover:bg-[var(--gold)]"><ArrowIcon /></span></div></div></Link>;
}

export default function ReadPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Articles");
  const [page, setPage] = useState(1);
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articleCatalog.filter((article) => {
      const matchesQuery = !normalizedQuery || [article.title, article.description, article.category].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesFilter = activeFilter === "All Articles" || filterCategories[activeFilter]?.includes(article.category);
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);
  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visibleArticles = filteredArticles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);
  const updateFilter = (filter: string) => { setActiveFilter(filter); setPage(1); };
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };

  return <main className="min-h-screen bg-[#f6f8fb] text-[var(--navy)]">
    <section className="relative min-h-[430px] overflow-hidden bg-[var(--navy)] px-6 pb-16 pt-32 text-white sm:min-h-[520px] sm:px-10 lg:min-h-[560px] lg:px-16 lg:pt-40"><Image src="/images/articles/bg.png" alt="Marching band performing at sunset" fill priority sizes="100vw" className="object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,47,.98)_0%,rgba(7,26,47,.86)_32%,rgba(7,26,47,.28)_72%,rgba(7,26,47,.12)_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,47,.35),transparent_55%)]" /><SiteNav /><div className="relative mx-auto flex max-w-[1320px] items-center"><div className="max-w-2xl"><div className="flex items-center gap-4"><span className="h-px w-8 bg-[var(--gold)]" /><p className="text-xs font-bold uppercase tracking-[0.28em]">Articles</p></div><h1 className="mt-6 text-6xl leading-[0.88] sm:text-7xl lg:text-[6.8rem]">Stories for<br /><span className="text-[var(--gold)]">Every Band Member</span></h1><p className="mt-6 max-w-xl text-base leading-6 text-white/85 sm:text-lg sm:leading-7">Inspiration, advice, and stories from the world of marching band. Read, learn, and make the time between performances part of the experience.</p></div></div></section>
    <section className="px-6 py-5 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1320px]"><label className="flex items-center gap-3 rounded-full border border-[var(--navy)]/15 bg-white px-5 py-3.5 shadow-[0_4px_14px_rgba(7,26,47,.04)]"><span aria-hidden="true" className="text-2xl leading-none">⌕</span><input value={query} onChange={(event) => updateQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--slate)]" placeholder="Search articles..." aria-label="Search articles" /></label><div className="mt-4 flex gap-2 overflow-x-auto pb-1">{filterLabels.map((filter) => <button type="button" key={filter} onClick={() => updateFilter(filter)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeFilter === filter ? "bg-[var(--navy)] text-white" : "bg-[#e8edf4] text-[var(--navy)] hover:bg-[var(--champagne)]"}`}>{filter}</button>)}</div></div></section>
    <section className="px-6 pb-20 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1320px]"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>{visibleArticles.length === 0 && <div className="rounded-2xl border border-dashed border-[var(--navy)]/20 bg-white px-6 py-16 text-center"><h2 className="text-3xl">No stories found.</h2><p className="mt-3 text-sm text-[var(--slate)]">Try a different search or choose another topic.</p><button type="button" onClick={() => { updateQuery(""); updateFilter("All Articles"); }} className="mt-6 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)]">Clear filters</button></div>}<div className="mt-10 flex items-center justify-center gap-2 text-sm" aria-label="Article pagination">{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button type="button" key={pageNumber} onClick={() => setPage(pageNumber)} aria-current={currentPage === pageNumber ? "page" : undefined} className={`flex h-9 w-9 items-center justify-center rounded-lg font-semibold ${currentPage === pageNumber ? "bg-[var(--navy)] text-white" : "border border-[var(--navy)]/10 bg-white hover:border-[var(--gold)]"}`}>{pageNumber}</button>)}{currentPage < pageCount && <button type="button" onClick={() => setPage(currentPage + 1)} aria-label="Next page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--navy)]/10 bg-white hover:border-[var(--gold)]"><ArrowIcon /></button>}</div></div></section>
    <section className="relative overflow-hidden bg-[var(--navy)] px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20"><Image src="/images/articles/bg.png" alt="" fill sizes="100vw" className="object-cover opacity-20" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,47,.96),rgba(7,26,47,.68))]" /><div className="relative mx-auto flex max-w-[1200px] flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><div className="flex items-center gap-4"><span className="h-px w-8 bg-[var(--gold)]" /><p className="text-xs font-bold uppercase tracking-[0.28em]">Stay updated</p></div><h2 className="mt-5 text-4xl sm:text-5xl">Get the Latest Articles</h2><p className="mt-3 text-sm text-white/70 sm:text-base">New stories, tips, and inspiration delivered to your inbox.</p></div><form className="flex w-full max-w-md overflow-hidden rounded-full bg-white p-1" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[var(--navy)] outline-none" placeholder="Enter your email address" aria-label="Email address" type="email" /><button className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)]">Subscribe</button></form></div></section>
  </main>;
}
