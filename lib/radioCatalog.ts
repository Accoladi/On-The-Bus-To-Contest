import type { RadioSong } from "@/components/radio/types";

type CuratedTrack = {
  aliases: string[];
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Keep this list in the editorial order requested for the radio experience.
// Aliases allow the upstream catalog to use a slightly different title or spelling.
const CURATED_TRACKS: CuratedTrack[] = [
  { aliases: ["on the bus to contest", "on the bus"] },
  { aliases: ["the people on my band bus", "people on my band bus"] },
  { aliases: ["we just need each other"] },
  { aliases: ["just laugh a little", "laugh a little"] },
  { aliases: ["breath into the blue", "breath into blue"] },
  { aliases: ["the field is waiting", "field is waiting"] },
  { aliases: ["stillness between heartbeats"] },
  { aliases: ["before the stadium wakes"] },
  { aliases: ["speak to yourself"] },
  { aliases: ["in the circle"] },
  { aliases: ["band forever"] },
  { aliases: ["maybe this is the point"] },
  { aliases: ["what will i do without this band"] },
  { aliases: ["not on my band bus"] },
  { aliases: ["my mother was a majorette"] },
  { aliases: ["why some music doesnt have words", "why some music doesnt have words version 2"] },
  { aliases: ["dolly parton marched in her high school band", "dolly parton marched in her highschool band"] },
  { aliases: ["wheres all this leading"] },
  { aliases: ["they call me a band geek"] },
  { aliases: ["the words we choose"] },
  { aliases: ["the sunday after contest"] },
  { aliases: ["our band is big"] },
  { aliases: ["my dreams came true in our band"] },
  { aliases: ["ribbon around our necks", "ribbon around our neck"] },
  { aliases: ["bandville usa", "bandville"] },
  { aliases: ["im gonna be a band director", "gonna be a band director", "i wanna be a band director"] },
  { aliases: ["goosebump fugato", "goosebumps fugato"] },
  { aliases: ["hot as hell", "hot as hell camp"] },
  { aliases: ["how to play a sousa march"] },
  { aliases: ["i can see", "i can see it"] },
  { aliases: ["i hate to practice", "hate to practice"] },
  { aliases: ["i love it"] },
  { aliases: ["i marched in the macys thanksgiving day parade"] },
  { aliases: ["its hard to be a vegetarian in this band"] },
  { aliases: ["leave it at the door"] },
  { aliases: ["michael farts when he marches", "micheal farts when he marches"] },
  { aliases: ["mixed meter"] },
  { aliases: ["no losers in band"] },
  { aliases: ["on the road to indy"] },
  { aliases: ["one last time for him"] },
  { aliases: ["our band directors got a honey", "our band directors got honey"] },
  { aliases: ["split spin crash"] },
  { aliases: ["the ballad of anthony mcgill"] },
  { aliases: ["the farmville band", "farmville band"] },
  { aliases: ["the texas rodeo parade"] },
  { aliases: ["the winning tradition"] },
  { aliases: ["third quarter kiss the ballad of barbara joe", "third quarter kiss"] },
  { aliases: ["wake up stand up band up"] },
  { aliases: ["the abbeville high royal grenadier band", "abbeville high royal grenadier band"] },
  { aliases: ["the drum major in the white house"] },
  { aliases: ["the line still holds"] },
  { aliases: ["our drum majors hot"] },
  { aliases: ["who stole my piccolo"] },
  { aliases: ["our drum major is our homecoming queen", "our drum is our homecoming queen"] },
  { aliases: ["the pit is not the pits"] },
  { aliases: ["our guard dont guard they kill"] },
  { aliases: ["our band directors a son of a something", "our band directors son of a something"] },
  { aliases: ["never not ever be late to rehearsal", "never not ever"] },
  { aliases: ["in our band we dont say a certain f word", "on our band we dont say a certain f word"] },
  { aliases: ["my mama said dont date a drummer"] },
  { aliases: ["lets hear it for the band kids", "lets hear it from the band kids"] },
  { aliases: ["daddy said"] },
];

export function curateRadioSongs(songs: RadioSong[]) {
  const available = songs.filter((song) => song?.title && song.status !== "draft" && !song.isRestricted);
  const used = new Set<string>();

  return CURATED_TRACKS.flatMap(({ aliases }) => {
    const normalizedAliases = aliases.map(normalize);
    const match = available.find((song) => !used.has(song.id) && normalizedAliases.includes(normalize(song.title)));
    if (!match) return [];
    used.add(match.id);
    return [match];
  });
}

