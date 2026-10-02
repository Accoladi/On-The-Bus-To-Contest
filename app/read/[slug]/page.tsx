import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ArticleAd } from "@/components/articles/ArticleAd";
import { ArticleMusicStrip } from "@/components/articles/ArticleMusicStrip";
import { CelebritiesArticle } from "@/components/articles/CelebritiesArticle";
import { MilitaryBandPromo } from "@/components/articles/MilitaryBandPromo";
import { PersonBesideSongCard } from "@/components/articles/PersonBesideSongCard";
import { articleCatalog } from "@/content/articles/articleCatalog";
import { onTheBusArticleContent } from "@/content/articles/onTheBusArticleContent";
import { additionalArticleContent } from "@/content/articles/additionalArticleContent";
import { collegeArticleContent } from "@/content/articles/collegeArticleContent";
import { speakToYourselfContent } from "@/content/articles/speakToYourselfContent";

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

function headingLabel(text: string) {
  if (text !== text.toUpperCase() || !/[A-Z]/.test(text)) return text;
  return text.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleCatalog.find((item) => item.slug === slug);
  const content = onTheBusArticleContent[slug] || additionalArticleContent[slug] || collegeArticleContent[slug] || (slug === "speak-to-yourself" ? speakToYourselfContent : undefined);

  if (!article || !content) notFound();

  const headings = content.sections.filter((section) => section.type === "heading").slice(0, 6);
  const embeddedSongTitle = slug === "person-beside-you" ? "We Just Need Each Other" : slug === "laughter-best-medicine" ? "Just Laugh A’Little" : slug === "speak-to-yourself" ? "Speak to Yourself" : slug === "who-are-these-people" ? "The People on My Band Bus" : null;
  const embeddedSongIndex = embeddedSongTitle ? content.sections.findIndex((section) => section.text === embeddedSongTitle) : -1;
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
              <h1 className="max-w-4xl text-[clamp(2.35rem,4.5vw,4.75rem)] leading-[0.98]">{slug === "celebrities-marching-band" ? <>Celebrities Who Once Rode<br />A Marching Band Bus</> : slug === "who-are-these-people" ? <>Who Are These People<br />Riding the Band Bus With Me?</> : slug === "quiet-before-first-note" ? <>The Quiet Before the First Note:<br />What Meditation Can Give You<br />Before a Marching Band Contest</> : slug === "person-beside-you" ? <>The Person Beside You<br />May Need You</> : slug === "laughter-best-medicine" ? <>Laughter May Be the Best Medicine<br />For a Nervous Condition<br />Before You Perform</> : slug === "your-season-in-your-pocket" ? <>Your Season in Your Pocket:<br />A Band-Bus Diary for the Ride to Contest</> : slug === "all-bands-look-different" ? <>Why Do All These Bands<br />Look So Different?</> : slug === "flute-to-old-guard" ? <>Could My Flute Take Me<br />To The Old Guard?</> : slug === "marching-band-pay-for-college" ? <>Could Marching Band<br />Help Pay for College?</> : slug === "social-media-etiquette" ? <>Social Media Etiquette<br />On Contest Day</> : article.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--navy)]/10 bg-[#f4f8fc] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">On the Bus to Contest</p>
          <p className="max-w-3xl text-lg font-bold leading-8 text-[var(--navy)] sm:text-xl">{article.description}</p>
        </div>
      </section>

      <section className="border-t border-[var(--navy)]/10 bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--purple)]">In this story</p>
            <nav className="mt-5 border-l border-[var(--gold)] pl-4">
              {headings.map((heading) => <a key={heading.text} href={`#${heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="mb-3 block text-sm leading-5 text-[var(--slate)] transition hover:text-[var(--purple)]">{heading.text}</a>)}
            </nav>
            <div className="mt-10 rounded-2xl bg-[var(--gold)] p-5 text-[var(--navy)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy)]">A note for the ride</p>
              <p className="mt-3 text-sm leading-6 text-[var(--navy)]/75">Read at your own pace. Save a thought that helps, then look up and notice the people sharing the bus with you.</p>
            </div>
          </aside>

          <article className="w-full">
            <div className="mb-10 border-b border-[var(--navy)]/10 pb-7 text-sm text-[var(--slate)]">{article.readingTime}</div>
            <div className={embeddedSongTitle ? "lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8" : undefined}>
              {embeddedSongTitle && <div className="order-first mb-8 lg:order-last lg:mb-0 lg:pt-1"><PersonBesideSongCard songTitle={embeddedSongTitle} /></div>}
              <div>
                {content.sections.map((section, index) => {
                  if (embeddedSongIndex >= 0 && index >= embeddedSongIndex) return <Fragment key={`${section.type}-${index}`} />;
                  if (slug === "laughter-best-medicine" && section.text === "SONG") return <Fragment key={`${section.type}-${index}`} />;
                  if (section.type === "heading") {
                    const id = section.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    if (slug === "celebrities-marching-band" && section.text === "Other Famous People Who Were in Band") return <Fragment key={`${section.type}-${index}`} />;
                    const heading = slug === "person-beside-you" && section.text === "Sometimes the Quiet Person Needs an Invitation" ? <>Sometimes the Quiet Person<br />Needs an Invitation</> : slug === "person-beside-you" && section.text === "Pay Attention to the Person Who Is Usually Strong" ? <>Pay Attention to the Person<br />Who Is Usually Strong</> : slug === "director-seems-different" && section.text === "Your Director Is Thinking About the Entire Band" ? <>Your Director Is Thinking<br />About the Entire Band</> : slug === "director-seems-different" && section.text === "They Are Solving Problems You May Never Know About" ? <>They Are Solving Problems<br />You May Never Know About</> : slug === "social-media-etiquette" && section.text === "Never Post Something to Humiliate Another Band" ? <>Never Post Something<br />To Humiliate Another Band</> : headingLabel(section.text);
                    return <Fragment key={`${section.type}-${index}`}>{slug === "quiet-before-first-note" && section.text === "When the Music Ends" && <ArticleMusicStrip />}<h2 id={id} className="mb-5 mt-12 scroll-mt-8 font-[family-name:var(--font-display)] text-3xl leading-[1.02] sm:text-4xl">{heading}</h2>{slug === "celebrities-marching-band" && section.text === "Featured Personalities" && <CelebritiesArticle />}</Fragment>;
                  }
                  return <p key={`${section.type}-${index}`} className={`mb-6 whitespace-pre-line text-[1.08rem] leading-8 text-[#35465a] ${slug === "celebrities-marching-band" && index === 0 ? "font-bold text-[var(--navy)]" : ""}`}>{section.text}</p>;
                })}
              </div>
            </div>
            {slug === "flute-to-old-guard" ? <MilitaryBandPromo /> : <ArticleAd index={articleIndex} brand={slug === "marching-band-pay-for-college" ? "Accoladi" : undefined} />}
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
