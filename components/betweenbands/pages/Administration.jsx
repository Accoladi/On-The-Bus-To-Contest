import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, ChevronDown, Copy, Download, Image as ImageIcon,
  Info, Megaphone, Monitor, Send, Smartphone, Users
} from 'lucide-react';

export const announcements = [
  ['Introducing BetweenBands.com', 'Band parents and fans in the stands, those few minutes between performances are now part of the fun. BetweenBands.com was created for the nine minutes while one band leaves the field and the next prepares to perform. Games, stories, music, humor, recipes, books, and more are waiting. Pull it up on your phone. When the next drum major salutes, phones down and eyes on the field. Again, that\'s BetweenBands.com.'],
  ['Play a Game', 'What are you doing while the next band gets ready? Try a game at BetweenBands.com and see how much you really know about marching band. Challenge the person sitting beside you. Pull it up on your phone. When the drum major salutes, phones down and enjoy the show. Again, that\'s BetweenBands.com.'],
  ['Between Bands Radio', 'There are songs about marching band parents, prop movers, parking, contests, and the wonderfully crazy world of band life. You\'ll find them on Between Bands Radio at BetweenBands.com. Pull it up on your phone. If you listen in the stands, please use earbuds - and when the drum major salutes, earbuds out and eyes on the field. Again, that\'s BetweenBands.com.'],
  ['Stories and Humor', 'Marching band creates stories that only band people truly understand. Between performances, discover stories, humor, and moments that may sound very familiar at BetweenBands.com. Pull it up on your phone. Then, when the next drum major salutes, give those performers your full attention. Again, that\'s BetweenBands.com.'],
  ['Tailgating Recipes', 'Already thinking about what you\'ll bring to the next contest? BetweenBands.com has tailgating recipes and food ideas for marching band Saturdays and hungry band families. Pull it up on your phone and find something new to try. When the drum major salutes, eyes back on the field. Again, that\'s BetweenBands.com.'],
  ['Books to Read', 'Marching band season includes plenty of buses, hotels, waiting, and travel time. Looking for something good to read? Check out the books featured at BetweenBands.com. Pull it up on your phone between performances and find your next read. Then, when the drum major salutes, it\'s time for the show. Again, that\'s BetweenBands.com.'],
  ['Understand What You\'re Watching', 'What exactly is General Effect? Why are bands divided into classes? What are the judges listening and watching for? BetweenBands.com can help you better understand what\'s happening on the field. Pull it up on your phone during the break and learn something new. When the drum major salutes, all eyes return to the field. Again, that\'s BetweenBands.com.'],
  ['For the Fans in the Stands', 'The students have the field. BetweenBands.com is for the fans in the stands. Games, stories, Between Bands Radio, tailgating recipes, books, humor, and more can make those nine minutes between performances part of your contest-day experience. Pull it up on your phone. When the drum major salutes, phones down and eyes up. Again, that\'s BetweenBands.com.'],
  ['Take It on the Ride Home', 'When tonight\'s contest ends, take Between Bands with you. Play a game, read a story, discover a book, share some marching band humor, or turn on Between Bands Radio for the ride home. Pull it up on your phone before you leave the stadium and keep the band day going. Again, that\'s BetweenBands.com.'],
  ['Keep the Conversation Going', 'When the scores have been announced and you\'re headed home, there\'s still plenty to discover at BetweenBands.com. Talk about tonight\'s performances, play a game together, read a story, explore tailgating recipes, or listen to songs on Between Bands Radio. Pull it up on your phone and take the experience home with you. Again, that\'s BetweenBands.com.'],
  ['Games, Trivia, and More', 'Looking for something fun between performances? Head to BetweenBands.com right now for games, trivia, articles, and more! Just open your phone\'s browser - no app needed! Again, the fun\'s at BetweenBands.com.'],
  ['Learn Between Performances', 'There is so much to learn about marching bands, and you can learn between today\'s performances at BetweenBands.com. There\'s even a book you can read about the history of marching bands. Again, that\'s on BetweenBands.com.'],
  ['Marching Band Trivia', 'Think you know marching band trivia? Test your skills on BetweenBands.com! From puzzles to fun facts - just open your browser and start playing. By the way, do you know which U.S. university has the largest bass drum? Find out now at BetweenBands.com.'],
  ['More for Band Fans', 'Attention, band fans! Want to know more about marching bands or test your trivia knowledge? BetweenBands.com has it all - just go to your browser and check it out now! Again, it\'s BetweenBands.com.'],
  ['Between Bands Radio', 'Now, not when a band is performing, but in between performances, open up your phone and listen to songs about marching band. That is once your earbuds are in. You will find those songs at BetweenBands.com under Radio. Oh, and the number one song is “Move That Line,” and it\'s about the line to the ladies\' restroom. Again, that\'s on BetweenBands.com!'],
  ['Band Bus Jokes', 'Need a good laugh? BetweenBands.com has some hilarious band bus jokes! Here\'s one: What do you call a documentary about trombone players? A slide show! Check out more in your phone\'s browser. Again, the jokes are on BetweenBands.com!'],
  ['Keep the Excitement Going', 'Keep the excitement going between performances by visiting BetweenBands.com! Pull out your phone, open your browser, and join in on the fun with trivia and games! Again, that\'s BetweenBands.com.'],
  ['How Did the Judges Get That Score?', 'Curious about how the contest is judged? Head to BetweenBands.com for a breakdown of how your bands are scored. It\'s in the article “How Did the Judges Get That Score?” It\'s super easy to access - just open your phone\'s browser. Again, it\'s on BetweenBands.com.'],
  ['Challenge Your Band Knowledge', 'Want to challenge your band knowledge? Visit BetweenBands.com for trivia and games. No apps - just open your phone\'s browser and join the fun! Remember, it\'s BetweenBands.com.'],
  ['Interactive Coloring Book', 'Feeling creative? You can design your own flag for next year\'s show with BetweenBands.com\'s interactive coloring book. Open your phone\'s browser and start coloring during the downtime! Again, that\'s at BetweenBands.com.'],
  ['Band Alumni Fun Facts', 'Did you know famous people like Dolly Parton, Lizzo, and President Bill Clinton were all in marching band? Learn more fun facts about band alumni at BetweenBands.com! Open your browser and check it out! Again, that\'s at BetweenBands.com.'],
  ['Dolly Parton on Between Bands Radio', 'Listen to the song “Dolly Parton Played in Her High School Band,” found only at BetweenBands.com under Radio. But listen only with your earbuds in, and only between performances or on the ride home.'],
];

const contestFormPreviewMode = true;

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia',
];

function downloadTextFile(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function submitContestInformation(payload) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error('Contest submissions are not configured yet.');
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/submit-contest-information`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${publishableKey}`,
      apikey: publishableKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || 'Unable to submit contest information. Please try again.');
  }
}

const scoreboardBanners = [
  { title: 'Scoreboard Banner 01', ratio: '16:3', label: 'Wide LED banner', src: '/images/administration/scoreboard/banners/betweenbands_scoreboard_1.png' },
  { title: 'Scoreboard Banner 02', ratio: '16:3', label: 'Wide LED banner', src: '/images/administration/scoreboard/banners/betweenbands_scoreboard_2.png' },
];

const scoreboardFullScreens = [
  { title: 'Full-Screen LED 01', ratio: '16:9', label: 'Full-screen LED graphic', src: '/images/administration/scoreboard/fullscreen/1.png' },
  { title: 'Full-Screen LED 02', ratio: '16:9', label: 'Full-screen LED graphic', src: '/images/administration/scoreboard/fullscreen/2.png' },
];

const mobileAssets = [
  { title: 'Digital Ad 01', ratio: '9:16', label: 'Portrait mobile artwork', src: '/images/administration/mobile/1.png' },
  { title: 'Digital Ad 02', ratio: '9:16', label: 'Portrait app ad', src: '/images/administration/mobile/2.png' },
  { title: 'Digital Ad 03', ratio: '9:16', label: 'Portrait digital program graphic', src: '/images/administration/mobile/3.png' },
];

const programAssets = [
  { title: 'Program Book Ad 01', ratio: '8.5:11', label: 'Portrait color print artwork', src: '/images/administration/program-books/1.png' },
  { title: 'Program Book Ad 02', ratio: '8.5:11', label: 'Portrait black and white print artwork', src: '/images/administration/program-books/2.png' },
  { title: 'Program Book Ad 03', ratio: '8.5:11', label: 'Landscape print artwork', src: '/images/administration/program-books/3.png' },
];

function PlaceholderArtwork({ ratio, sourceRatio, label, src, variant = '' }) {
  if (src) return <img src={src} alt={label} className="block h-auto w-full object-contain shadow-[0_14px_34px_rgba(0,0,0,.22)]" />;
  const aspect = ratio === '16:3' ? 'aspect-[16/3]' : ratio === '16:9' ? 'aspect-video' : ratio === '1:1' ? 'aspect-square' : ratio === '17:11' ? 'aspect-[17/11]' : 'aspect-[8.5/11]';
  return <div className={`grid ${aspect} place-items-center border border-dashed border-[#D6A62E]/70 bg-[#0B2742] p-2 text-center text-[#F4F0E8] ${variant}`}>
    <div><ImageIcon className="mx-auto mb-1 text-[#D6A62E]" size={18} /><p className="text-[9px] font-bold uppercase tracking-[.1em]">{sourceRatio || ratio} placeholder</p><p className="mt-0.5 hidden text-[9px] text-white/65 sm:block">{label}</p></div>
  </div>;
}

export function ResourceNav() {
  const links = [
    ['Announcements', 'announcements', Megaphone], ['Scoreboard Graphics', 'graphics', Monitor],
    ['Contest App Ads', 'digital-ads', Smartphone], ['Program Book Ads', 'program-ads', BookOpen],
  ];
  return <nav aria-label="Administration resources" className="mt-8 grid w-full max-w-[880px] grid-cols-2 gap-4">
    {links.map(([label, target, Icon]) => <a key={target} href={`#${target}`} className="group inline-flex -skew-x-[9deg] items-center justify-center gap-3 border border-[#D6A62E] bg-[#06182B]/90 px-4 py-5 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(6,24,43,.18)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#D6A62E] hover:text-[#06182B] sm:px-6 sm:text-[15px]"><Icon className="skew-x-[9deg]" size={22} /><span className="skew-x-[9deg]">{label}</span></a>)}
  </nav>;
}

export function Hero() {
  return <section className="relative isolate min-h-[calc(100svh-61px)] overflow-hidden border-b border-[#D6A62E] bg-[#06182B]">
    <div className="absolute inset-0 -z-30 bg-[url('/images/administration/hero-bg1.png')] bg-cover bg-[78%_center] md:bg-[62%_center] lg:bg-center" />
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,252,245,1)_0%,rgba(255,252,245,.98)_31%,rgba(255,252,245,.88)_46%,rgba(255,252,245,.35)_62%,rgba(6,24,43,.08)_100%)]" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,24,43,.08),transparent_42%,rgba(6,24,43,.25))]" />
    <div className="pointer-events-none absolute bottom-10 right-8 hidden max-w-[190px] text-right text-white xl:block"><p className="text-sm font-bold uppercase tracking-[.26em]">Fill the time.<br />Support the tradition.</p><span className="ml-auto mt-5 block h-px w-28 bg-[#D6A62E]" /></div>
    <div className="mx-auto flex min-h-[calc(100svh-61px)] max-w-[1500px] items-center px-6 py-20 sm:px-10 lg:px-16">
      <div className="max-w-[780px] 2xl:max-w-[1100px]"><p className="text-[11px] font-black tracking-[.3em] text-[#06182B]">CONTEST RESOURCES</p><h1 className="mt-5 font-display text-[clamp(4.25rem,9vw,9.5rem)] font-black uppercase leading-[.72] tracking-[-.035em] text-[#06182B]">Administration</h1><p className="mt-7 max-w-[670px] text-lg font-medium leading-relaxed text-[#143753] sm:text-2xl">Ready-to-use materials for contest organizers, announcers, apps, scoreboards, and printed programs.</p><ResourceNav /></div>
    </div>
  </section>;
}

export function OverviewCard() {
  const rows = [[Megaphone, 'Public address announcements'], [Monitor, 'LED scoreboard banners'], [Smartphone, 'Contest app and digital program ads'], [BookOpen, 'Program book ads'], [Users, 'Messaging for before the contest, between performances, and the ride home']];
  return <aside className="border border-[#06182B]/10 bg-white/55 p-6 shadow-[0_20px_60px_rgba(6,24,43,.07)] backdrop-blur-sm sm:p-8"><h2 className="font-display text-3xl font-black uppercase leading-none text-[#06182B]">What’s on this page</h2><ul className="mt-7 space-y-4">{rows.map(([Icon, text]) => <li key={text} className="flex gap-3 text-[14px] leading-snug text-[#173550]"><Icon className="mt-0.5 shrink-0 text-[#06182B]" size={18} />{text}</li>)}</ul><p className="mt-7 border-t border-[#D6A62E]/75 pt-4 text-center text-xs font-bold italic text-[#173550]">Same music. A stronger experience.</p></aside>;
}

function AccordionItem({ item, index, open, setOpen }) {
  const [title, script] = item;
  const isOpen = open === index;
  return <article className={`overflow-hidden border border-[#06182B]/15 bg-[#FFFCF5] transition-colors ${isOpen ? 'border-[#D6A62E]/70' : ''}`}><button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left text-[15px] font-extrabold text-[#06182B] hover:bg-[#F7F0DD] sm:text-base"><span className="flex items-center gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#06182B] text-xs text-white">{index + 1}</span>{title}</span><ChevronDown size={19} strokeWidth={2.4} className={`shrink-0 ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <div className="border-t border-[#D6A62E]/45 bg-[#FFF8E6] px-5 py-4 text-[15px] leading-relaxed text-[#18344F] sm:px-6 sm:text-base"><AnnouncementScript script={script} /></div>}</article>;
}

function AnnouncementScript({ script }) {
  const emphasisPattern = /(BetweenBands\.com|Between Bands Radio|Pull it up on your phone\.?)/g;
  const isEmphasis = (part) => part === 'BetweenBands.com' || part === 'Between Bands Radio' || /^Pull it up on your phone\.?$/.test(part);
  return script.split(emphasisPattern).map((part, index) => isEmphasis(part) ? <strong key={`${part}-${index}`} className="font-extrabold text-[#06182B]">{part}</strong> : part);
}

export function AnnouncementAccordion({ limit }) {
  const [open, setOpen] = useState(0);
  const shown = limit ? announcements.slice(0, limit) : announcements;
  const splitAt = Math.ceil(shown.length / 2);
  return <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-6"><div className="space-y-3">{shown.slice(0, splitAt).map((item, index) => <AccordionItem key={item[0]} item={item} index={index} open={open} setOpen={setOpen} />)}</div>{shown.length > splitAt && <div className="space-y-3">{shown.slice(splitAt).map((item, position) => <AccordionItem key={item[0]} item={item} index={position + splitAt} open={open} setOpen={setOpen} />)}</div>}</div>;
}

export function DownloadAssetCard({ asset, presentation = 'compact' }) {
  const isPrint = presentation === 'print';
  const actions = <div className={isPrint ? 'w-full' : 'flex flex-wrap gap-2'}><a href={asset.src} download className={`inline-flex min-h-11 items-center gap-2 bg-[#F6C631] px-4 py-2 text-xs font-extrabold text-[#06182B] shadow-[0_8px_18px_rgba(214,166,46,.16)] transition hover:bg-[#D6A62E] ${isPrint ? 'w-full justify-center' : ''}`}><Download size={16} />Download PNG</a></div>;
  const details = <div><p className="text-[11px] font-black tracking-[.18em] text-[#B88418]">READY TO USE</p><h3 className="mt-2 font-display text-3xl font-black uppercase leading-none text-[#06182B]">{asset.title}</h3></div>;
  if (presentation === 'scoreboard') return <article className="overflow-hidden border border-[#06182B]/12 bg-white shadow-[0_18px_45px_rgba(6,24,43,.07)]"><div className="bg-[#0B2742] p-3 sm:p-4"><PlaceholderArtwork ratio={asset.ratio} sourceRatio={asset.sourceRatio} label={asset.label} src={asset.src} variant={asset.variant} /></div><div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-end sm:p-7">{details}{actions}</div></article>;
  const previewWidth = 'w-full';
  const cardWidth = presentation === 'print' ? 'max-w-[360px]' : presentation === 'digital' ? 'max-w-[330px]' : 'max-w-[330px]';
  return <article className={`mx-auto flex w-full ${cardWidth} flex-col overflow-hidden border border-[#06182B]/12 bg-white shadow-[0_18px_45px_rgba(6,24,43,.06)]`}><div className="grid place-items-center"><div className={previewWidth}><PlaceholderArtwork ratio={asset.ratio} sourceRatio={asset.sourceRatio} label={asset.label} src={asset.src} variant={asset.variant} /></div></div><div className="flex flex-1 flex-col justify-between p-6">{details}<div className="mt-6">{actions}</div></div></article>;
}

function ScoreboardFeatureCard({ asset }) {
  return <article className="overflow-hidden border border-[#06182B]/12 bg-white shadow-[0_18px_45px_rgba(6,24,43,.07)]"><img src={asset.src} alt={asset.label} className="block h-auto w-full" /><div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black tracking-[.18em] text-[#B88418]">READY TO USE</p><h3 className="mt-2 font-display text-2xl font-black uppercase leading-none">{asset.title}</h3></div><a href={asset.src} download className="inline-flex min-h-11 w-fit items-center gap-2 bg-[#F6C631] px-4 text-xs font-extrabold transition hover:bg-[#D6A62E]"><Download size={16} />Download PNG</a></div></article>;
}

function ContestInformation() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');
    setMessage('');

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      if (!contestFormPreviewMode) await submitContestInformation(payload);
      form.reset();
      setStatus('success');
      setMessage(contestFormPreviewMode
        ? 'Thank you. Your contest information has been received for preview purposes.'
        : 'Thank you. Your contest information has been submitted.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'We were unable to submit your information. Please try again.');
    }
  };

  const fieldClass = 'min-h-12 rounded-sm border border-[#C8D5DF] bg-[#FFFEFC] px-3 text-sm font-medium outline-none transition placeholder:text-[#8A9AAD] focus:border-[#0B2742] focus:ring-2 focus:ring-[#D6A62E]/35';
  const labelClass = 'grid gap-1.5 text-sm font-extrabold text-[#173550]';

  return <section id="contest-information" className="bg-[#F8F5EE] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
    <div className="mx-auto grid max-w-[1360px] overflow-hidden border border-[#06182B]/10 bg-[#FFFDF8] lg:grid-cols-[.78fr_1.22fr]">
      <aside className="relative min-h-[470px] overflow-hidden bg-[#F6F0E4] p-8 sm:p-12 lg:min-h-[720px] lg:p-14">
        <div className="absolute inset-0 bg-[url('/images/marching-contests-small.jpeg')] bg-cover bg-[center_bottom] opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,.98),rgba(255,253,248,.88)_48%,rgba(255,253,248,.25))]" />
        <div className="relative z-10 max-w-[300px]"><p className="text-[11px] font-black tracking-[.28em] text-[#264365]">HELP US GROW</p><h2 className="mt-4 font-display text-5xl font-black uppercase leading-[.82] text-[#06182B] sm:text-6xl">Share your contest information</h2><span className="mt-6 block h-[3px] w-14 bg-[#F6C631]" /><div className="mt-6 space-y-5 text-[15px] leading-[1.35] text-[#18344F]"><p>BetweenBands.com would greatly appreciate having a record of the marching band contests that are sharing BetweenBands.com with their audiences.</p><p>The information you provide will help us better understand where BetweenBands.com is being used, how many students and families it is reaching, and how we can continue to improve and expand this complimentary resource from year to year.</p><p>Thank you for helping us grow BetweenBands.com.</p></div></div>
      </aside>
      <div className="p-5 sm:p-9 lg:p-10">
        <form onSubmit={handleSubmit} className="border border-[#D6E0E8] bg-white/75 p-6 shadow-[0_16px_45px_rgba(6,24,43,.05)] sm:p-8">
          <div><h2 className="font-display text-4xl font-black uppercase leading-none text-[#06182B] sm:text-5xl">Contest information</h2><p className="mt-2 text-[15px] font-medium text-[#355775]">Please share a few details about your marching band contest.</p></div>
          <div className="mt-7 grid gap-4">
            <label className={labelClass}>Name of Marching Band Contest<input required name="contestName" autoComplete="organization" placeholder="Enter contest name" className={fieldClass} /></label>
            <label className={labelClass}>Sponsor of Marching Band Contest<input name="sponsor" placeholder="Enter sponsoring organization" className={fieldClass} /></label>
            <label className={labelClass}>Coordinating Individual<input name="coordinator" autoComplete="name" placeholder="Enter name" className={fieldClass} /></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>City<input name="city" autoComplete="address-level2" placeholder="Enter city" className={fieldClass} /></label><label className={labelClass}>State<select name="state" defaultValue="" className={`${fieldClass} text-[#718197]`}><option value="" disabled>Select state</option>{usStates.map((state) => <option key={state} value={state}>{state}</option>)}</select></label></div>
            <label className={labelClass}>Date<input name="date" type="date" className={`${fieldClass} text-[#355775]`} /></label>
            <label className={labelClass}>Number of Participating Bands<input name="bands" type="number" min="0" inputMode="numeric" placeholder="Enter number" className={fieldClass} /></label>
            <label className={labelClass}>Estimated Number of Fans in Stands throughout<input name="fans" type="number" min="0" inputMode="numeric" placeholder="Enter estimated number" className={fieldClass} /></label>
          </div>
          <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#F6C631] px-5 text-sm font-extrabold text-[#06182B] shadow-[0_8px_20px_rgba(214,166,46,.18)] transition hover:bg-[#D6A62E] disabled:cursor-wait disabled:opacity-70"><Send size={18} />{status === 'submitting' ? 'Submitting…' : 'Submit Contest Information'}</button>
          <div aria-live="polite" className={`mt-4 ${status === 'success' ? 'border-l-4 border-[#718C55] bg-[#F2F7EA] text-[#315124]' : status === 'error' ? 'border-l-4 border-[#AA3F35] bg-[#FCF0ED] text-[#7D2D25]' : 'hidden'} px-4 py-3 text-sm font-semibold`}>{message}</div>
          <p className="mt-5 flex gap-3 border-t border-[#D6E0E8] pt-5 text-[12px] leading-relaxed text-[#536D85]"><Info className="mt-0.5 shrink-0 text-[#1A5F91]" size={20} />Providing this information is optional and is not required to use BetweenBands.com.</p>
        </form>
      </div>
    </div>
  </section>;
}

export default function Administration() {
  const copyScripts = async () => { await navigator.clipboard?.writeText(announcements.map(([title, script], i) => `${i + 1}. ${title}\n${script}`).join('\n\n')); };
  const downloadAnnouncements = () => downloadTextFile('between-bands-announcements.txt', announcements.map(([title, script], i) => `${i + 1}. ${title}\n\n${script}`).join('\n\n'));
  return <div className="bg-[#F8F5EE] text-[#06182B]"><Hero />
    <section className="flex min-h-[calc(100svh-61px)] items-center bg-[#F8F5EE] px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-[1.12fr_.88fr] lg:items-center"><div><p className="mb-5 text-[10px] font-black tracking-[.22em] text-[#B88418]">THE PURPOSE</p><h2 className="font-display text-5xl font-black uppercase leading-[.82] sm:text-7xl">Keeping the spotlight on what matters most</h2><div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-[#18344F] sm:text-lg"><p>BetweenBands.com is a complimentary product of Accoladi.com that helps fill the 8–9 minutes between performances with games, stories, humor, books, tailgating recipes, educational content, and Between Bands Radio.</p><p>These materials are designed to complement the contest — not compete with it. Our goal is to keep audiences informed, engaged, and entertained between performances, then when the next drum major salutes, all eyes return to the field.</p></div></div><OverviewCard /></div></section>
    <section id="announcements" className="flex min-h-[calc(100svh-61px)] items-center border-y border-[#06182B]/8 bg-[#F1EEE6] px-6 py-14 sm:px-10 lg:px-16"><div className="mx-auto w-full max-w-[1360px]"><div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between"><div><p className="mb-3 text-[11px] font-black tracking-[.22em] text-[#B88418]">CONTEST DAY TOOLKIT</p><h2 className="font-display text-5xl font-black uppercase leading-[.9] sm:text-6xl">Contest day announcements</h2><p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#18344F] sm:text-base">10 ready-to-use public address announcements. Select a script to preview it, then copy or customize it for your contest.</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={downloadAnnouncements} className="inline-flex min-h-12 items-center gap-2 bg-[#F6C631] px-5 py-3 text-sm font-extrabold shadow-[0_8px_20px_rgba(214,166,46,.18)] transition hover:bg-[#D6A62E]"><Download size={18} />Download all announcements</button><button type="button" onClick={copyScripts} className="inline-flex min-h-12 items-center gap-2 border border-[#06182B] bg-white/30 px-5 py-3 text-sm font-extrabold backdrop-blur-sm"><Copy size={18} />Copy all scripts</button></div></div><AnnouncementAccordion /></div></section>
    <section id="graphics" className="flex min-h-[calc(100svh-61px)] items-center bg-[#F8F5EE] px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto w-full max-w-[1360px]"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-3 text-[11px] font-black tracking-[.22em] text-[#B88418]">STADIUM READY</p><h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Scoreboard / LED graphics</h2><p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#18344F] sm:text-base">Featured graphics for your stadium scoreboard or video display. View the complete banner and full-screen library when you are ready.</p></div><Link to="/administration/scoreboard" className="inline-flex min-h-12 w-fit items-center border border-[#06182B] px-5 text-sm font-extrabold text-[#06182B] transition hover:bg-[#06182B] hover:text-white">View all scoreboard graphics</Link></div><div className="mt-10 grid gap-7 md:grid-cols-2">{scoreboardBanners.map(asset => <ScoreboardFeatureCard key={asset.title} asset={asset} />)}{scoreboardFullScreens.map(asset => <ScoreboardFeatureCard key={asset.title} asset={asset} />)}</div></div></section>
    <section id="digital-ads" className="flex min-h-[calc(100svh-61px)] items-center bg-[#F1EEE6] px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto w-full max-w-[1360px]"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-3 text-[11px] font-black tracking-[.22em] text-[#B88418]">MOBILE FIRST</p><h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Contest app &amp; digital program ads</h2><p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#18344F] sm:text-base">A selected set of vertical graphics sized for event apps, mobile displays, and digital programs.</p></div><Link to="/administration/digital-ads" className="inline-flex min-h-12 w-fit items-center border border-[#06182B] px-5 text-sm font-extrabold text-[#06182B] transition hover:bg-[#06182B] hover:text-white">View all digital ads</Link></div><div className="mt-10 grid gap-7 md:grid-cols-3">{mobileAssets.map(asset => <DownloadAssetCard key={asset.title} asset={asset} presentation="digital" />)}</div></div></section>
    <section id="program-ads" className="flex min-h-[calc(100svh-61px)] items-center bg-[#F8F5EE] px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto w-full max-w-[1360px]"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-3 text-[11px] font-black tracking-[.22em] text-[#B88418]">PRINT READY</p><h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Program book ads</h2><p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#18344F] sm:text-base">Featured print-ready artwork for your contest program.</p></div><Link to="/administration/program-books" className="inline-flex min-h-12 w-fit items-center border border-[#06182B] px-5 text-sm font-extrabold text-[#06182B] transition hover:bg-[#06182B] hover:text-white">View all program ads</Link></div><div className="mt-10 grid gap-7 md:grid-cols-3">{programAssets.map(asset => <DownloadAssetCard key={asset.title} asset={asset} presentation="print" />)}</div></div></section>
    <ContestInformation />
  </div>;
}
