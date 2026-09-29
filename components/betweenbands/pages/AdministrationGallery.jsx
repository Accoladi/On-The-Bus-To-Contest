import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Image as ImageIcon } from 'lucide-react';

const collections = {
  scoreboard: {
    eyebrow: 'STADIUM READY', title: 'Scoreboard & LED graphics', description: 'Download-ready artwork for scoreboards, stadium displays, and video boards.',
    groups: [
      { title: 'Scoreboard banners', description: 'Ultra-wide graphics for ribbon boards and horizontal scoreboard placements.', aspect: 'wide', items: [
        ['Scoreboard Banner 01', '/images/administration/scoreboard/banners/betweenbands_scoreboard_1.png'],
        ['Scoreboard Banner 02', '/images/administration/scoreboard/banners/betweenbands_scoreboard_2.png'],
      ] },
      { title: 'Full-screen displays', description: 'Large-format graphics for full-screen LED and stadium video placements.', aspect: 'screen', items: [
        ['Full-Screen LED 01', '/images/administration/scoreboard/fullscreen/1.png'],
        ['Full-Screen LED 02', '/images/administration/scoreboard/fullscreen/2.png'],
        ['Full-Screen LED 03', '/images/administration/scoreboard/fullscreen/3.png'],
        ['Full-Screen LED 04', '/images/administration/scoreboard/fullscreen/4.png'],
      ] },
    ],
  },
  'digital-ads': {
    eyebrow: 'MOBILE FIRST', title: 'Contest app & digital program ads', description: 'Portrait artwork for event apps, mobile displays, and digital programs.',
    groups: [{ title: 'Digital ad library', description: 'Use these portrait files where a mobile-first event message is needed.', aspect: 'portrait', cardSize: 'digital', items: [
      ['Digital Ad 01', '/images/administration/mobile/1.png'],
      ['Digital Ad 02', '/images/administration/mobile/2.png'],
      ['Digital Ad 03', '/images/administration/mobile/3.png'],
    ] }],
  },
  'program-books': {
    eyebrow: 'PRINT READY', title: 'Program book ads', description: 'High-resolution artwork prepared for printed contest programs.',
    groups: [{ title: 'Program book library', description: 'Confirm placement requirements with your printer before final production.', aspect: 'portrait', cardSize: 'print', items: [
      ['Program Book Ad 01', '/images/administration/program-books/1.png'],
      ['Program Book Ad 02', '/images/administration/program-books/2.png'],
      ['Program Book Ad 03', '/images/administration/program-books/3.png'],
      ['Program Book Ad 04', '/images/administration/program-books/4.png'],
    ] }],
  },
};

function GalleryCard({ item, aspect, cardSize }) {
  const [title, src] = item;
  const isPortrait = aspect === 'portrait';
  const portraitSize = cardSize === 'print' ? 'max-w-[360px]' : 'max-w-[330px]';
  return <article className={`overflow-hidden border border-[#06182B]/12 bg-white shadow-[0_18px_45px_rgba(6,24,43,.06)] ${isPortrait ? `mx-auto w-full ${portraitSize}` : ''}`}><img src={src} alt={title} className="block h-auto w-full" /><div className="flex flex-col gap-5 p-5"><div><p className="text-[10px] font-black tracking-[.18em] text-[#B88418]">RESOURCE FILE</p><h2 className="mt-2 font-display text-2xl font-black uppercase leading-none">{title}</h2></div><a href={src} download className="inline-flex min-h-11 w-fit items-center gap-2 bg-[#F6C631] px-4 text-xs font-extrabold transition hover:bg-[#D6A62E]"><Download size={16} />Download PNG</a></div></article>;
}

export default function AdministrationGallery() {
  const { collection } = useParams();
  const page = collections[collection];
  if (!page) return null;
  return <main className="bg-[#F8F5EE] px-6 py-14 text-[#06182B] sm:px-10 lg:px-16"><div className="mx-auto max-w-[1360px]"><Link to="/administration" className="inline-flex min-h-11 items-center gap-2 border border-[#06182B]/25 px-4 text-sm font-extrabold transition hover:border-[#06182B] hover:bg-white"><ArrowLeft size={17} />Back to Administration</Link><header className="max-w-3xl py-14"><p className="text-[11px] font-black tracking-[.22em] text-[#B88418]">{page.eyebrow}</p><h1 className="mt-4 font-display text-5xl font-black uppercase leading-[.84] sm:text-7xl">{page.title}</h1><p className="mt-6 text-lg leading-relaxed text-[#18344F]">{page.description}</p></header><div className="space-y-20">{page.groups.map(group => <section key={group.title} className="border-t border-[#06182B]/15 pt-10"><div className="mb-8 max-w-2xl"><h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl">{group.title}</h2><p className="mt-3 text-[15px] leading-relaxed text-[#18344F]">{group.description}</p></div><div className={group.aspect === 'wide' ? 'grid gap-7 lg:grid-cols-2' : group.aspect === 'screen' ? 'grid gap-7 md:grid-cols-2' : 'grid gap-7 sm:grid-cols-2 lg:grid-cols-3'}>{group.items.map(item => <GalleryCard key={item[0]} item={item} aspect={group.aspect} cardSize={group.cardSize} />)}</div></section>)}</div></div></main>;
}
