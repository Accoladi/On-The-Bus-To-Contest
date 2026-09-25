import Image from "next/image";
import type { RadioPromo, RadioSong } from "@/components/radio/types";

export function localMediaUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("/radio-ads/")) return `/content/radio-ads/${url.slice("/radio-ads/".length).split("?")[0]}`;
  return url;
}

export function SongPromoBanner({ promo }: { promo?: RadioPromo }) {
  if (!promo?.backgroundImageUrl) return null;
  const imageUrl = localMediaUrl(promo.backgroundImageUrl);
  const logoUrl = localMediaUrl(promo.logoImageUrl);

  return (
    <a href={promo.href || "#"} target="_blank" rel="noreferrer" className="group relative mt-7 block min-h-[142px] overflow-hidden rounded-2xl border border-white/10 bg-[var(--navy)] shadow-lg">
      <Image src={imageUrl} alt={promo.websiteName || "Sponsor"} fill sizes="(max-width: 768px) 100vw, 580px" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,24,.9),rgba(3,10,24,.48)_56%,rgba(3,10,24,.12))]" />
      <div className="relative grid min-h-[142px] grid-cols-[minmax(0,65fr)_minmax(0,35fr)] items-stretch text-white">
        <div className="flex min-w-0 flex-col justify-center gap-2 px-5 py-5">
          <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[.2em]">{promo.websiteName || "Sponsor"}</span>
          <p className="max-w-[24ch] text-[10px] font-bold uppercase tracking-[.16em] text-white/75">{promo.heading || "Presented with support"}</p>
          <p className="max-w-[24ch] text-[15px] font-semibold leading-tight">{promo.subheading || "Supporting the music between performances."}</p>
        </div>
        {logoUrl && <div className="relative flex items-center justify-center p-4"><Image src={logoUrl} alt="" fill sizes="180px" className="object-contain p-3 drop-shadow-[0_10px_24px_rgba(0,0,0,.38)]" /></div>}
      </div>
    </a>
  );
}

export function FormattedLyrics({ lyrics }: { lyrics?: string }) {
  const normalized = (lyrics || "").replace(/\\n/g, "\n").replace(/\r\n?/g, "\n").trim();
  if (!normalized) return <p className="mt-5 text-sm leading-7 text-[var(--slate)]">Lyrics are not available for this song yet.</p>;
  const blocks = normalized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const sectionPattern = /^(lyrics|intro|verse(?:\s+\d+)?|pre[-\s]?chorus(?:\s+\d+)?|chorus(?:\s+\d+)?|bridge|breakdown|instrumental|solo|final[-\s]?chorus|outro|tag|coda|interlude|refrain)$/i;
  return <div className="mt-5 space-y-8">{blocks.map((block, blockIndex) => { const lines = block.split("\n").map((line) => line.trim()).filter(Boolean); const hasTitle = sectionPattern.test(lines[0] || ""); return <section key={blockIndex} className="space-y-3">{hasTitle && <h4 className="text-[10px] font-bold uppercase tracking-[.22em] text-[var(--purple)]">{lines[0]}</h4>}<div className="space-y-2.5">{(hasTitle ? lines.slice(1) : lines).map((line, index) => <p key={index} className="text-[15px] leading-7 text-[var(--navy)]/80">{line}</p>)}</div></section>; })}</div>;
}

const LYRIC_AD_FILES: Record<string, string[]> = {
  accoladi: ["Accoaldi_3.png", "Accoaldi_4.png", "Accoaldi_5.png", "Accoaldi_6.png", "Accoaldi_7.png", "Accoaldi_8.png", "Accoaldi_9.png", "Accoaldi_10.png", "Accoaldi_11.png", "Accoaldi_12.png", "Accoaldi_13.png", "Accoladi_1.png", "Accoladi_2.png", "Accoladi_14.png", "Accoladi_15.png"],
  nationalScholasticMusiciansAwards: ["National-Scholastic-Musician-Awards_7.png", "National-Scholastic-Musicians-Awards_1.png", "National-Scholastic-Musicians-Awards_2.png", "National-Scholastic-Musicians-Awards_3.png", "National-Scholastic-Musicians-Awards_4.png", "National-Scholastic-Musicians-Awards_5.png", "National-Scholastic-Musicians-Awards_6.png", "National-Scholastic-Musicians-Awards_8.png", "National-Scholastic-Musicians-Awards_9.png", "National-Scholastic-Musicians-Awards_10.png", "National-Scholastic-Musicians-Awards_11.png", "National-Scholastic-Musicians-Awards_12.png", "National-Scholastic-Musicians-Awards_13.png", "National-Scholastic-Musicians-Awards_14.png", "National-Scholastic-Musicians-Awards_15.png"],
  firstChairAmerica: ["FirstChair-America_1.png", "FirstChair-America_2.png", "FirstChair-America_3.png", "FirstChair-America_4.png", "FirstChair-America_5.png", "FirstChair-America_6.png", "FirstChair-America_7.png", "FirstChair-America_8.png", "FirstChair-America_9.png", "FirstChair-America_10.png", "FirstChair-America_11.png", "FirstChair-America_12.png", "FirstChair-America_13.png", "FirstChair-America_14.png", "FirstChair-America_15.png"],
  myMusicFuture: ["My-Music-Future_1.png", "My-Music-Future_2.png", "My-Music-Future_3.png", "My-Music-Future_4.png", "My-Music-Future_5.png", "My-Music-Future_6.png", "My-Music-Future_7.png", "My-Music-Future_8.png", "My-Music-Future_9.png", "My-Music-Future_10.png", "My-Music-Future_11.png", "My-Music-Future_12.png", "My-Music-Future_13.png", "My-Music-Future_14.png", "My-Music-Future_15.png", "My-Music-Future_16.png"],
};

function stableHash(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) hash = ((hash << 5) + hash) ^ value.charCodeAt(index);
  return Math.abs(hash);
}

function lyricAdUrl(song: RadioSong) {
  const websiteKey = song.promo?.websiteKey;
  const files = websiteKey ? LYRIC_AD_FILES[websiteKey] : undefined;
  if (!websiteKey || !files?.length) return null;
  const fileName = files[stableHash([song.slug, song.id, websiteKey].filter(Boolean).join("|")) % files.length];
  return `https://daioi4xdbqyhz.cloudfront.net/radio-lyric-ads/${websiteKey === "nationalScholasticMusiciansAwards" ? "NationalScholasticMusicianAwards" : websiteKey === "firstChairAmerica" ? "FirstChair-America" : websiteKey === "myMusicFuture" ? "MyMusic" : "Accoladi"}/${encodeURIComponent(fileName)}`;
}

export function LyricAdBanner({ song }: { song: RadioSong }) {
  const imageUrl = lyricAdUrl(song);
  if (!imageUrl) return null;
  return <div className="mx-auto mt-4 w-full overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-white shadow-sm"><Image src={imageUrl} alt={`${song.promo?.websiteName || "Sponsor"} lyric advertisement`} width={1122} height={1402} sizes="(max-width: 768px) 100vw, 32rem" className="h-auto w-full" /></div>;
}
