import Image from "next/image";

const people = [
  ["Dolly Parton", "Drums and Majorette", "Sevier County High School · Sevierville, Tennessee", "Country music artist, businesswoman, philanthropist", "5", "Dolly Parton performing"],
  ["Lizzo", "Flute, Piccolo, and French Horn", "Alief Elsik High School · Houston, Texas", "Singer, songwriter, rapper, actress", "1", "Lizzo playing flute"],
  ["Jennifer Garner", "Saxophone", "George Washington High School · Charleston, West Virginia", "Actor, film producer, spokesperson", "2", "Jennifer Garner playing saxophone"],
  ["Vince Carter", "Euphonium and Drum Major", "Mainland High School · Daytona Beach, Florida", "Basketball player", "3", "Vince Carter in a basketball jersey"],
  ["Bill Clinton", "Saxophone and Drum Major", "Hot Springs High School · Hot Springs, Arkansas", "42nd President of the United States", "4", "Bill Clinton in a suit"],
  ["Julia Roberts", "Oboe", "Campbell High School · Smyrna, Georgia", "Actress", "6", "Julia Roberts with her oboe"],
  ["Jimmy Kimmel", "Clarinet", "Ed W. Clark High School · Las Vegas, Nevada", "Television host", "7", "Jimmy Kimmel with his clarinet"],
  ["Aretha Franklin", "Tuba", "Northern High School · Detroit, Michigan", "Singer-songwriter, producer, civil-rights activist", "8", "Aretha Franklin smiling"],
  ["Neil Armstrong", "Euphonium", "Blume High School · Wapakoneta, Ohio", "Astronaut and first person to walk on the Moon", "9", "Neil Armstrong in uniform"],
  ["Samuel L. Jackson", "Trumpet, Piccolo, and French Horn", "Riverside High School · Chattanooga, Tennessee", "Actor, director, civil-rights activist", "10", "Young Samuel L. Jackson"],
  ["Amanda Seyfried", "Clarinet", "William Allen High School · Allentown, Pennsylvania", "Actress, singer", "11", "Amanda Seyfried"],
  ["Vanessa Williams", "French Horn, Piano, Violin", "Horace Greeley High School · Chappaqua, New York", "Singer, actress, Broadway performer", "12", "Vanessa Williams"],
  ["Steven Spielberg", "Clarinet", "Saratoga High School · Saratoga, California", "Film director, producer, screenwriter", "13", "Steven Spielberg"],
  ["Ewan McGregor", "French Horn, Drums", "Morrison’s Academy · Crieff, Scotland", "Actor, singer, director", "14", "Ewan McGregor"],
  ["Drew Carey", "Trumpet and Cornet", "James Ford Rhodes High School · Cleveland, Ohio", "Comedian, actor, and game-show host", "article-celebrity/Drew Carey.png", "Drew Carey"],
  ["Pharrell Williams", "Drums and Percussion", "Princess Anne High School · Virginia Beach, Virginia", "Musician, producer, songwriter, and fashion designer", "article-celebrity/pharrel williams.png", "Pharrell Williams"],
] as const;

const instruments = [
  ["Flute", "Alanis Morissette · Halle Berry · Celine Dion · Terry Crews · Calista Flockhart · George Eastman · Alyssa Milano · Noah Webster · Gwen Stefani · Tina Fey · Molly Erdman · James Wolfensohn · Knute Rockne · Oscar Robertson · Patrick Henry · John Quincy Adams · Sarah Palin"],
  ["Oboe", "Julia Roberts · Dennis O'Hare"],
  ["Clarinet", "Rainn Wilson · Woody Allen · Gloria Estefan · Tony Shalhoub · Eva Longoria · Michael DeBakey · Allan Greenspan · Steven Spielberg · Robert Reid · Amy Acuff"],
  ["Bass Clarinet", "Zakk Wylde · George Segal"],
  ["Saxophone", "Allan Greenspan · Roy Williams · David Robinson · Fred MacMurray · Tedy Bruschi · Bob Hope · Lionel Richie · Tyler Wright · Tom Selleck · Richard Gere · Ronald McNair · Robert Ryman"],
  ["Trumpet", "James Woods · John Glenn · Michael Anthony · Drew Carey · Kesha · Steven Tyler · Prince Charles · Montel Williams · Peter Weller · Steve Earle · Shania Twain · Flea · Jackie Gleason · Eric Lindros · Brandon Routh · Samuel L. Jackson"],
  ["French Horn", "Ewan McGregor · Vanessa Williams · Otto Graham · Henry Cisneros · Samuel L. Jackson"],
  ["Trombone", "Jonathan Frakes · Bill Engvall · Nelly Furtado · Conrad Janis · Bobby Bowden · John Pankow · Tony Stewart · Fred Rogers"],
  ["Baritone", "Neil Armstrong"],
  ["Tuba", "Andy Griffith · Malik Rose · Thomas F. Wilson · Harry Smith · Dan Aykroyd · Aretha Franklin"],
  ["Percussion", "Mike Anderson · Tommy Lee · Adam Brody · Tracy Simien · Johnny Depp · Eddie George · Trent Reznor · Dana Carvey · Vinnie Paul · Walter Payton · Johnny Carson · Mike Piazza · Emeril Lagasse · Rosie O’Donnell · Pharrell Williams"],
] as const;

export function CelebritiesArticle() {
  return <div className="mt-8">
    <div className="grid gap-5 sm:grid-cols-2">
      {people.map(([name, played, school, knownFor, image, alt]) => <article key={name} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--navy)] text-white shadow-sm"><div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[var(--navy)]"><Image src={image.includes("/") ? `/images/articles/${image}` : `/content/images/articles/article-content-pics/celebrities/${image}.png`} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div><div className="p-5"><h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">{name}</h3><dl className="mt-4 space-y-2 text-sm leading-5 text-white/75"><div><dt className="font-bold text-white">Played</dt><dd>{played}</dd></div><div><dt className="font-bold text-white">High school</dt><dd>{school}</dd></div><div><dt className="font-bold text-white">Known for</dt><dd>{knownFor}</dd></div></dl></div></article>)}
    </div>
    <h3 className="mb-5 mt-14 font-[family-name:var(--font-display)] text-3xl leading-tight">Other Famous People Who Were in Band</h3>
    <div className="grid gap-4 sm:grid-cols-2">{instruments.map(([instrument, names]) => <section key={instrument} className="rounded-xl border border-[var(--navy)]/10 bg-[#f7f3ea] p-5"><h4 className="font-[family-name:var(--font-display)] text-xl">{instrument}</h4><p className="mt-2 text-sm leading-6 text-[var(--slate)]">{names}</p></section>)}</div>
    <div className="mt-10 space-y-6 text-[1.08rem] leading-8 text-[#35465a]">
      <p>These legendary figures remind us that the path is clear: discipline, teamwork, creativity, and perseverance travel well together. And the next remarkable story may already be about to step off this bus.</p>
      <p>That story may be yours.</p>
      <p>But today, when you step onto that field, remember this: you are already a marching, music-making celebrity.</p>
    </div>
  </div>;
}
