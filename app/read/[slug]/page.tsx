import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ArticleAd } from "@/components/articles/ArticleAd";
import { ArticleMusicStrip } from "@/components/articles/ArticleMusicStrip";
import { articleCatalog } from "@/content/articles/articleCatalog";
import { onTheBusArticleContent } from "@/content/articles/onTheBusArticleContent";
import { additionalArticleContent } from "@/content/articles/additionalArticleContent";
import { collegeArticleContent } from "@/content/articles/collegeArticleContent";

const categoryStyles: Record<string, string> = {
  Mindset: "bg-[#5a2a78]",
  Confidence: "bg-[#b84138]",
  People: "bg-[#2c8b69]",
  Directors: "bg-[#a06b19]",
  Wellbeing: "bg-[#355d9b]",
  Stories: "bg-[#a06b19]",
  "Band Culture": "bg-[#5a2a78]",
  "College & Scholarships": "bg-[#355d9b]",
  "Student Life": "bg-[#2c8b69]",
};

export function generateStaticParams() {
  return articleCatalog.map(({ slug }) => ({ slug }));
}

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleCatalog.find((item) => item.slug === slug);
  const content = onTheBusArticleContent[slug] || additionalArticleContent[slug] || collegeArticleContent[slug];

  if (!article || !content) notFound();

  const headings = content.sections.filter((section) => section.type === "heading").slice(0, 6);
  const articleIndex = articleCatalog.findIndex((item) => item.slug === article.slug);
  const related = articleCatalog.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[var(--navy)]">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
        <div className="relative h-[clamp(360px,42vw,780px)] sm:h-[clamp(480px,calc(30vw+260px),780px)]">
          <Image src={article.image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,47,.9),rgba(7,26,47,.44)_52%,rgba(7,26,47,.16))]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,47,.68),transparent_55%)]" />
        </div>
        <SiteNav solid />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-[1320px]">
            <Link href="/read" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/75 transition hover:text-[var(--gold)]">
              <span aria-hidden="true">←</span> All articles
            </Link>
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${categoryStyles[article.category] || "bg-[var(--purple)]"}`}>{article.category}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{article.readingTime}</span>
              </div>
              <h1 className="max-w-4xl text-[clamp(2.35rem,4.5vw,4.75rem)] leading-[0.98]">{article.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--navy)]/10 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">On the Bus to Contest</p>
          <p className="max-w-3xl text-lg leading-8 text-[var(--slate)] sm:text-xl">{article.description}</p>
        </div>
      </section>

      <section className="border-t border-[var(--navy)]/10 bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">In this story</p>
            <nav className="mt-5 border-l border-[var(--gold)] pl-4">
              {headings.map((heading) => <a key={heading.text} href={`#${heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="mb-3 block text-sm leading-5 text-[var(--slate)] transition hover:text-[var(--purple)]">{heading.text}</a>)}
            </nav>
            <div className="mt-10 rounded-2xl bg-[var(--navy)] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--soft-champagne)]">A note for the ride</p>
              <p className="mt-3 text-sm leading-6 text-white/75">Read at your own pace. Save a thought that helps, then look up and notice the people sharing the bus with you.</p>
            </div>
          </aside>

          <article className="max-w-3xl">
            <div className="mb-10 border-b border-[var(--navy)]/10 pb-7 text-sm text-[var(--slate)]">{article.readingTime}</div>
            {content.sections.map((section, index) => {
              if (section.type === "heading") {
                const id = section.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return <Fragment key={`${section.type}-${index}`}>{slug === "quiet-before-first-note" && section.text === "When the Music Ends" && <ArticleMusicStrip />}<h2 id={id} className="mb-5 mt-12 scroll-mt-8 font-[family-name:var(--font-display)] text-3xl leading-[1.02] sm:text-4xl">{section.text}</h2></Fragment>;
              }
              return <p key={`${section.type}-${index}`} className="mb-6 whitespace-pre-line text-[1.08rem] leading-8 text-[#35465a]">{section.text}</p>;
            })}
            <ArticleAd index={articleIndex} />
            <div className="mt-14 border-t border-[var(--navy)]/10 pt-8">
              <Link href="/read" className="inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--soft-champagne)]">Back to all articles <ArrowIcon /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--navy)]/10 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">Keep reading</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl">More for the ride.</h2></div><Link href="/read" className="hidden text-sm font-semibold text-[var(--purple)] sm:block">Explore all <ArrowIcon /></Link></div>
          <div className="mt-7 grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/read/${item.slug}`} className="group overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-[1.65] overflow-hidden"><Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--purple)]">{item.category}</p><h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--slate)]">{item.description}</p></div></Link>)}</div>
        </div>
      </section>
    </main>
  );
}
