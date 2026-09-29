import Image from "next/image";
import Link from "next/link";

type Article = {
  category: string;
  title: string;
  readTime: string;
  description: string;
  image: string;
  featured?: boolean;
};

const articles: Article[] = [
  {
    category: "Mindset",
    title: "7 Ways to Calm Your Mind Before the Contest",
    readTime: "5 min read",
    description: "You’re on the bus. The uniforms are packed. Here are simple, practical ways to quiet your mind and get ready to perform your best.",
    image: "/images/articles/article-title-pics/calm-your-mind.png",
    featured: true,
  },
  {
    category: "Confidence",
    title: "Your Job Is Not to Be Perfect",
    readTime: "4 min read",
    description: "It’s normal to feel nervous. Here’s what to remember when the ‘what if I mess up?’ thoughts start creeping in.",
    image: "/images/articles/article-title-pics/job-not-perfect.png",
  },
  {
    category: "People",
    title: "The Person Beside You May Need You",
    readTime: "6 min read",
    description: "A kind word, a simple conversation, or just being there can make a bigger difference than you realize.",
    image: "/images/articles/article-title-pics/person-needs-you.png",
  },
  {
    category: "Directors",
    title: "Your Director Seems Different Today — There’s a Reason",
    readTime: "5 min read",
    description: "Contest day is a big day for them too. Here’s what they’re thinking about, and how you can support them.",
    image: "/images/articles/article-title-pics/director-seems-different.png",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>;
}

function ArticleMeta({ article }: { article: Article }) {
  return <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--slate)]"><span>{article.category}</span><span className="h-1 w-1 rounded-full bg-[var(--gold)]" /><span>{article.readTime}</span></div>;
}

export function ArticlesSection() {
  const [featured, ...secondary] = articles;

  return (
    <section id="read" className="relative overflow-hidden bg-[var(--cream)] px-6 py-20 text-[var(--navy)] sm:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute right-[-4rem] top-[-5rem] h-72 w-72 opacity-[0.06] sm:right-8 sm:top-[-7rem] sm:h-[30rem] sm:w-[30rem]">
        <Image src="/images/articles/hero-bg.png" alt="" fill sizes="480px" className="object-contain" />
      </div>
      <div className="relative mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-4"><p className="text-xs font-bold uppercase tracking-[0.24em]">Read</p><span className="h-1 w-20 rounded-full bg-[var(--gold)]" /></div>
            <h2 className="mt-4 max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">Before You Step Off the Bus</h2>
            <p className="mt-4 text-base text-[var(--slate)] sm:text-lg">Mindset. Preparation. Real Stories. Everything you need before you step off the bus.</p>
          </div>
          <Link href="/read" className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_10px_24px_rgba(231,184,75,.22)] transition hover:-translate-y-0.5 hover:bg-[var(--champagne)] hover:shadow-[0_14px_30px_rgba(231,184,75,.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">Explore All Reads <ArrowIcon /></Link>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.16fr_0.94fr]">
          <Link href="/read" className="group relative min-h-[500px] overflow-hidden rounded-[10px] bg-[var(--navy)] text-white shadow-[0_16px_40px_rgba(7,26,47,0.12)] sm:min-h-[580px]">
            <Image src={featured.image} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,47,0.98)] via-[rgba(7,26,47,0.24)] to-[rgba(7,26,47,0.02)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full bg-[var(--gold)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--navy)]">Featured</span>
              <div className="mt-28 sm:mt-36"><ArticleMeta article={{ ...featured, category: "Mindset" }} /><h3 className="mt-4 max-w-2xl text-4xl leading-[0.98] sm:text-5xl">{featured.title}</h3><p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{featured.description}</p><span className="mt-6 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-bold text-[var(--navy)]">Read Now <ArrowIcon /></span></div>
            </div>
          </Link>

          <div className="grid gap-4">
            {secondary.map((article) => <Link href="/read" key={article.title} className="group grid min-h-[145px] grid-cols-[minmax(130px,38%)_1fr_auto] gap-4 rounded-[10px] bg-white p-2.5 shadow-[0_8px_24px_rgba(7,26,47,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(7,26,47,0.12)] sm:grid-cols-[minmax(160px,38%)_1fr_auto] sm:gap-5 sm:p-3">
              <div className="relative min-h-[120px] overflow-hidden rounded-md"><Image src={article.image} alt="" fill sizes="(max-width: 640px) 38vw, 220px" className="object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="flex min-w-0 flex-col justify-center pr-2"><ArticleMeta article={article} /><h3 className="mt-3 text-xl leading-[1.02] sm:text-2xl">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--slate)]">{article.description}</p></div>
              <span className="hidden h-9 w-9 self-center rounded-full bg-[#c6e4ff] text-center text-xl leading-9 text-[var(--navy)] sm:block">→</span>
            </Link>)}
          </div>
        </div>
      </div>
    </section>
  );
}
