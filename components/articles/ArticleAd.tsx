import Image from "next/image";

const articleAds = [
  {
    brand: "Accoladi",
    href: "https://accoladi.com",
    image: "/content/images/articles/articles-ads/accoladi/ChatGPT Image Sep 2, 2026, 08_00_33 PM.png",
  },
  {
    brand: "My Music Future",
    href: "https://mymusicfuture.com",
    image: "/content/images/articles/articles-ads/mymusicfuture/ChatGPT Image Sep 2, 2026, 09_00_44 PM.png",
  },
  {
    brand: "First Chair America",
    href: "https://firstchairamerica.com",
    image: "/content/images/articles/articles-ads/firstchairamerica/ChatGPT Image Sep 2, 2026, 09_15_36 PM.png",
  },
  {
    brand: "National Scholastic Musicians Awards",
    href: "https://nationalscholasticmusiciansawards.com",
    image: "/content/images/articles/articles-ads/nsma/ChatGPT Image Sep 2, 2026, 08_59_13 PM.png",
  },
];

export function ArticleAd({ index }: { index: number }) {
  const ad = articleAds[index % articleAds.length];

  return (
    <aside className="mt-14 border-t border-[var(--navy)]/10 pt-8" aria-label={`${ad.brand} advertisement`}>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slate)]/70">Sponsored</p>
      <a href={ad.href} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-white shadow-[0_10px_28px_rgba(7,26,47,.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(7,26,47,.14)]">
        <Image src={ad.image} alt={`${ad.brand} advertisement`} width={1774} height={900} sizes="(max-width: 768px) 100vw, 760px" className="h-auto w-full transition duration-500 group-hover:scale-[1.01]" />
      </a>
    </aside>
  );
}

