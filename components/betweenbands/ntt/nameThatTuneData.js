// ============================================================================
// nameThatTuneData.js — Tune Library & Audio Source Resolution
// ============================================================================
//
// ARCHITECTURE NOTES
// ──────────────────
// 1. Every tune has a `src` field that is either:
//      • A relative path:  "/audio/name-that-tune/snippets/Star_Wars_snip.mp3"
//      • An absolute URL:  "https://cdn.example.com/..."
//    The consuming code does NOT care which — it passes `src` directly to `new Audio(src)`.
//
// 2. To migrate from local to CDN, change ONLY `AUDIO_BASE_URL` below.
//    All relative `src` fields will be resolved against it.
//    Set to "" (empty string) for local /public serving (Vite default).
//
// 3. Tune schema:
//    {
//      id:         number   — unique, stable identifier (never reuse after deletion)
//      title:      string   — display name shown after answer reveal
//      src:        string   — audio file path or URL
//      clues:      string[] — 3 tiered hints: [soft vibe, medium context, strong hint]
//      category:   string   — grouping tag (e.g., "stand-tune", "halftime", "classic")
//      tempo:      'slow' | 'medium' | 'fast'   — optional UX hint
//      durationSec: number  — clip length in seconds (for progress bar)
//    }
//
// 4. SNIPPET WORKFLOW
//    Full-length recordings live in /public/audio/name-that-tune/.
//    Run `npm run make:snippets` to generate 10s snippet files in snippets/.
//    Only snippet files are referenced here.
//
// ============================================================================

/**
 * CDN base URL for audio files.
 *
 * LOCAL DEV:  Set to "" — Vite serves from /public at root.
 * PRODUCTION: Set to "https://cdn.betweenbands.com/audio"
 *             and remove local files from /public.
 */
const AUDIO_BASE_URL = "";

/**
 * Resolves a tune source path.
 * If src is already an absolute URL (http/https), returns as-is.
 * Otherwise, prepends AUDIO_BASE_URL.
 */
const resolveSrc = (src) => {
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    return `${AUDIO_BASE_URL}${src}`;
};

// ============================================================================
// TUNE LIBRARY — Marching Band Edition
// ============================================================================
//
// HOW TO ADD A NEW TUNE:
//   1. Place the full-length .mp3 in /public/audio/name-that-tune/
//   2. Add a new entry in scripts/make-snippets.sh
//   3. Run `npm run make:snippets` to generate the 10s clip
//   4. Add an entry below with a unique `id` (increment from last)
//   5. Set `src` to the snippet path
//   6. Add a `clues` array with 3 strings: [soft hint, medium hint, strong hint]
//
// CLUE GUIDELINES:
//   - Do NOT quote lyrics or copyrighted text
//   - Tier 1 (soft): vibe, energy, or era hint
//   - Tier 2 (medium): cultural context, movie/event association
//   - Tier 3 (strong): very recognizable detail or title hint
//
// ============================================================================

const SNIP = "/entertainment/audio/name-that-tune/snippets";

const RAW_TUNES = [
    {
        id: 1, title: "2001: A Space Odyssey", src: `${SNIP}/2001_Fanfare_snip.mp3`,
        category: "classic", tempo: "slow", durationSec: 10,
        clues: [
            "🎶 This piece builds from silence into a massive, triumphant fanfare.",
            "🎬 It became iconic through a Stanley Kubrick sci-fi film.",
            "🎺 The opening of 'Also sprach Zarathustra' by Richard Strauss."
        ]
    },
    {
        id: 2, title: "America the Beautiful", src: `${SNIP}/America_the_Beautiful_snip.mp3`,
        category: "patriotic", tempo: "slow", durationSec: 10,
        clues: [
            "🇺🇸 This is a deeply patriotic, hymn-like piece often played at ceremonies.",
            "🏟️ It's commonly performed at sporting events alongside the national anthem.",
            "🎵 The lyrics praise 'spacious skies' and 'amber waves of grain.'"
        ]
    },
    {
        id: 3, title: "Battle Hymn of the Republic", src: `${SNIP}/Battle_Hymn_snip.mp3`,
        category: "patriotic", tempo: "medium", durationSec: 10,
        clues: [
            "⚔️ This stirring march has deep roots in American Civil War history.",
            "🎖️ It's a staple at military events and patriotic celebrations.",
            "🎵 Its most famous line references 'glory, glory' in a triumphant refrain."
        ]
    },
    {
        id: 4, title: "Birdland", src: `${SNIP}/Birdland_snip.mp3`,
        category: "jazz", tempo: "fast", durationSec: 10,
        clues: [
            "🎷 This tune has a funky, jazz-fusion energy with driving brass.",
            "🌃 It's named after a legendary New York City jazz club.",
            "🎹 Originally by Weather Report, it's a marching band jazz staple."
        ]
    },
    {
        id: 5, title: "Bohemian Rhapsody", src: `${SNIP}/Bohemian_Rhapsody_snip.mp3`,
        category: "rock", tempo: "medium", durationSec: 10,
        clues: [
            "🎭 This epic piece shifts between ballad, opera, and hard rock sections.",
            "🎬 It saw a massive revival thanks to a 2018 biopic.",
            "👑 Originally by Queen, it was a groundbreaking 1975 rock masterpiece."
        ]
    },
    {
        id: 6, title: "O Fortuna (Carmina Burana)", src: `${SNIP}/Carmina_Burana_snip.mp3`,
        category: "classical", tempo: "fast", durationSec: 10,
        clues: [
            "🌩️ This piece is dramatic, intense, and sounds absolutely massive.",
            "🎬 It's been used in countless movie trailers to build epic tension.",
            "📜 Composed by Carl Orff, it's a medieval Latin choral masterwork."
        ]
    },
    {
        id: 7, title: "We Are the Champions", src: `${SNIP}/Champions_snip.mp3`,
        category: "rock", tempo: "medium", durationSec: 10,
        clues: [
            "🏆 This anthem is synonymous with victory and celebration.",
            "🏟️ It's played at championship games and trophy ceremonies worldwide.",
            "👑 Queen's Freddie Mercury wrote this ultimate victory song."
        ]
    },
    {
        id: 8, title: "Crazy in Love", src: `${SNIP}/Crazy_in_Love_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "🔥 This track opens with a massive, unmistakable brass riff.",
            "💃 It defined early 2000s pop and dominated radio and MTV.",
            "👑 Beyoncé's debut solo smash hit featuring Jay-Z."
        ]
    },
    {
        id: 9, title: "Don't Stop Believin'", src: `${SNIP}/Dont_Stop_Believin_snip.mp3`,
        category: "rock", tempo: "medium", durationSec: 10,
        clues: [
            "🎹 This song starts with one of the most recognizable piano riffs ever.",
            "📺 It became a cultural phenomenon after being featured in a TV series finale.",
            "🎤 Journey's iconic 1981 arena rock anthem."
        ]
    },
    {
        id: 10, title: "Eye of the Tiger", src: `${SNIP}/Eye_of_the_Tiger_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "🥊 This track is the ultimate workout and motivation anthem.",
            "🎬 It was written specifically for a famous boxing movie sequel.",
            "🐯 Survivor's iconic theme from Rocky III."
        ]
    },
    {
        id: 11, title: "In the Stone", src: `${SNIP}/In_the_Stone_snip.mp3`,
        category: "funk", tempo: "fast", durationSec: 10,
        clues: [
            "🔥 This track is a high-energy funk-fusion piece with soaring brass.",
            "🎺 It features an HBCU marching band performance style.",
            "🌍 Originally by Earth, Wind & Fire — a marching band crowd-pleaser."
        ]
    },
    {
        id: 12, title: "Ghostbusters", src: `${SNIP}/Ghostbusters_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "👻 This fun, catchy track has a supernatural theme.",
            "🎬 It was the theme song for a blockbuster 1984 comedy film.",
            "📞 The chorus famously asks 'Who ya gonna call?'"
        ]
    },
    {
        id: 13, title: "Gonna Fly Now", src: `${SNIP}/Gonna_Fly_Now_snip.mp3`,
        category: "classic", tempo: "medium", durationSec: 10,
        clues: [
            "🎺 This inspirational fanfare builds from gentle to triumphant.",
            "🥊 It's associated with one of cinema's most famous training montages.",
            "🏃 The main theme from the original Rocky (1976)."
        ]
    },
    {
        id: 14, title: "Hey Baby", src: `${SNIP}/Hey_Baby_snip.mp3`,
        category: "stand-tune", tempo: "fast", durationSec: 10,
        clues: [
            "🎉 This is an upbeat, crowd-participation party anthem.",
            "🏟️ College marching bands play this to get the crowd singing along.",
            "🎵 DJ Ötzi's version made this a worldwide stadium staple."
        ]
    },
    {
        id: 15, title: "Hit Me with Your Best Shot", src: `${SNIP}/Hit_Me_Best_Shot_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "💥 This is a punchy, defiant rock anthem with attitude.",
            "🎸 It's a go-to for marching band rock arrangements.",
            "🎤 Pat Benatar's 1980 power-rock classic."
        ]
    },
    {
        id: 16, title: "House of the Rising Sun", src: `${SNIP}/House_Rising_Sun_snip.mp3`,
        category: "rock", tempo: "medium", durationSec: 10,
        clues: [
            "🌅 This song has a dark, haunting, and bluesy quality.",
            "🎸 It's an American folk song made famous by a British rock band.",
            "🏠 The Animals' 1964 version set in New Orleans is definitive."
        ]
    },
    {
        id: 17, title: "Malagueña", src: `${SNIP}/Malaguena_snip.mp3`,
        category: "classical", tempo: "fast", durationSec: 10,
        clues: [
            "🔥 This piece is fiery, passionate, and builds intensity rapidly.",
            "🎺 It's a showcase piece for brass sections at band competitions.",
            "🇪🇸 A Spanish-influenced classical piece by Ernesto Lecuona."
        ]
    },
    {
        id: 18, title: "Live and Let Die", src: `${SNIP}/Live_and_Let_Die_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "💣 This song shifts dramatically between soft ballad and explosive rock.",
            "🎬 It was written as a theme for a famous spy movie franchise.",
            "🎤 Paul McCartney & Wings wrote this James Bond classic."
        ]
    },
    {
        id: 19, title: "Louie, Louie", src: `${SNIP}/Louie_Louie_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "🎸 This is a simple, infectious garage-rock riff everyone recognizes.",
            "🏟️ It's one of the most played songs at college sporting events.",
            "🎵 The Kingsmen's 1963 version is the quintessential party anthem."
        ]
    },
    {
        id: 20, title: "MacArthur Park", src: `${SNIP}/MacArthur_Park_snip.mp3`,
        category: "classic", tempo: "medium", durationSec: 10,
        clues: [
            "🎭 This is an ambitious, orchestral pop piece with dramatic crescendos.",
            "🎺 Marching bands love its sweeping, cinematic arrangement.",
            "🎵 Originally a 1968 Jimmy Webb composition, famously covered by Donna Summer."
        ]
    },
    {
        id: 21, title: "Magnificent Seven", src: `${SNIP}/Magnificent_Seven_snip.mp3`,
        category: "classic", tempo: "medium", durationSec: 10,
        clues: [
            "🤠 This theme has a bold, adventurous Western feel.",
            "🎬 It was composed for a classic 1960 Western film.",
            "🎵 Elmer Bernstein's iconic cowboy theme — later used in Marlboro ads."
        ]
    },
    {
        id: 22, title: "Olympic Fanfare", src: `${SNIP}/Olympic_Fanfare_snip.mp3`,
        category: "classic", tempo: "medium", durationSec: 10,
        clues: [
            "🎺 This is a majestic, brass-heavy fanfare that screams ceremony.",
            "🏅 It was composed for a major international sporting event.",
            "🇺🇸 John Williams wrote this for the 1984 Los Angeles Olympics."
        ]
    },
    {
        id: 23, title: "Seven Nation Army", src: `${SNIP}/Seven_Nation_Army_snip.mp3`,
        category: "rock", tempo: "medium", durationSec: 10,
        clues: [
            "🎸 This song's bass riff is one of the most chanted in stadiums worldwide.",
            "⚽ It became a global soccer and sports anthem.",
            "🎵 The White Stripes' 2003 stomping rock masterpiece."
        ]
    },
    {
        id: 24, title: "She Works Hard for the Money", src: `${SNIP}/She_Works_Hard_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "💪 This is an empowering, dance-ready anthem about hard work.",
            "🪩 It was a defining hit of the early 1980s dance-pop era.",
            "🎤 Donna Summer's tribute to working women everywhere."
        ]
    },
    {
        id: 25, title: "Shout It Out", src: `${SNIP}/Shout_It_Out_snip.mp3`,
        category: "stand-tune", tempo: "fast", durationSec: 10,
        clues: [
            "📢 This is a high-energy, crowd-participation anthem.",
            "🏟️ It's a staple at pep rallies and football halftime shows.",
            "🎵 A marching band arrangement designed to get fans on their feet."
        ]
    },
    {
        id: 26, title: "Shut Up and Drive", src: `${SNIP}/Shut_Up_and_Drive_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "🏎️ This is an aggressive, high-energy pop-rock track.",
            "🎸 It blends pop vocals with a driving rock guitar hook.",
            "🎤 Rihanna's 2007 rock-influenced banger."
        ]
    },
    {
        id: 27, title: "Sing, Sing, Sing", src: `${SNIP}/Sing_Sing_Sing_snip.mp3`,
        category: "jazz", tempo: "fast", durationSec: 10,
        clues: [
            "🥁 This piece is driven by an iconic, relentless tom-tom drum pattern.",
            "🎷 It defined the swing era and Big Band jazz.",
            "🎵 Benny Goodman's legendary 1936 swing anthem."
        ]
    },
    {
        id: 28, title: "Single Ladies", src: `${SNIP}/Single_Ladies_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "💍 This track has a bouncy, staccato beat with an iconic dance routine.",
            "🎬 Its music video became one of the most imitated of all time.",
            "👑 Beyoncé's 2008 empowerment anthem about putting a ring on it."
        ]
    },
    {
        id: 29, title: "Sock It To 'Em", src: `${SNIP}/Sock_It_To_Em_snip.mp3`,
        category: "stand-tune", tempo: "fast", durationSec: 10,
        clues: [
            "🎺 This is a brassy, high-energy marching band fight tune.",
            "🏟️ It's associated with college football traditions and bowl games.",
            "🏈 Also known as the 'Orange Bowl March' — a classic band staple."
        ]
    },
    {
        id: 30, title: "Star Wars Main Theme", src: `${SNIP}/Star_Wars_snip.mp3`,
        category: "classic", tempo: "fast", durationSec: 10,
        clues: [
            "🌌 This fanfare is one of the most recognizable in cinema history.",
            "🎬 It opens a space opera saga that began in 1977.",
            "🎵 John Williams' legendary theme for a galaxy far, far away."
        ]
    },
    {
        id: 31, title: "Stars and Stripes Forever", src: `${SNIP}/Stars_and_Stripes_snip.mp3`,
        category: "patriotic", tempo: "fast", durationSec: 10,
        clues: [
            "🇺🇸 This is the quintessential American patriotic march.",
            "🎺 Its piccolo solo is one of the most famous in all of music.",
            "🎵 John Philip Sousa's masterpiece — the National March of the United States."
        ]
    },
    {
        id: 32, title: "Strike Up the Band", src: `${SNIP}/Strike_Up_the_Band_snip.mp3`,
        category: "classic", tempo: "fast", durationSec: 10,
        clues: [
            "🎶 This is a lively, celebratory piece perfect for parades.",
            "🎭 It was originally written for a Broadway musical.",
            "🎵 George Gershwin's 1930 show tune turned marching band classic."
        ]
    },
    {
        id: 33, title: "Survivor", src: `${SNIP}/Survivor_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "💪 This is a defiant, empowering anthem about resilience.",
            "🎤 It comes from one of the biggest R&B girl groups of the early 2000s.",
            "👑 Destiny's Child's fierce declaration of independence."
        ]
    },
    {
        id: 34, title: "The Horse", src: `${SNIP}/The_Horse_snip.mp3`,
        category: "funk", tempo: "fast", durationSec: 10,
        clues: [
            "🐴 This instrumental has a funky, swaggering groove.",
            "🏟️ It's been a marching band and pep band staple for decades.",
            "🎷 Cliff Nobles' 1968 funk instrumental — the ultimate stand tune."
        ]
    },
    {
        id: 35, title: "Thriller", src: `${SNIP}/Thriller_snip.mp3`,
        category: "pop", tempo: "medium", durationSec: 10,
        clues: [
            "🧟 This song has a spooky, Halloween-ready vibe with a funky groove.",
            "🎬 Its music video revolutionized the medium and featured a famous dance.",
            "👑 Michael Jackson's 1982 mega-hit from the best-selling album of all time."
        ]
    },
    {
        id: 36, title: "Twist and Shout", src: `${SNIP}/Twist_and_Shout_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "🎉 This is an energetic, call-and-response party rocker.",
            "🎬 It's famously featured in a parade scene in a John Hughes movie.",
            "🎤 The Beatles' explosive cover became bigger than the original."
        ]
    },
    {
        id: 37, title: "Night on Bald Mountain", src: `${SNIP}/Night_Bald_Mountain_snip.mp3`,
        category: "classical", tempo: "fast", durationSec: 10,
        clues: [
            "🌙 This piece is dark, ominous, and powerfully dramatic.",
            "🎬 It was memorably featured in Disney's Fantasia.",
            "🎵 Mussorgsky's vision of a witches' sabbath on a mountain peak."
        ]
    },
    {
        id: 38, title: "William Tell Overture", src: `${SNIP}/William_Tell_snip.mp3`,
        category: "classical", tempo: "fast", durationSec: 10,
        clues: [
            "🐎 This piece has a galloping rhythm that evokes a horseback chase.",
            "🤠 It became the theme for a famous masked cowboy TV show.",
            "🎵 Rossini's overture — forever linked with the Lone Ranger."
        ]
    },
    {
        id: 39, title: "Wipeout", src: `${SNIP}/Wipeout_snip.mp3`,
        category: "rock", tempo: "fast", durationSec: 10,
        clues: [
            "🥁 This song is famous for its wild, driving drum solo.",
            "🏄 It captures the energy of 1960s surf rock culture.",
            "🎵 The Surfaris' 1963 instrumental is a drumline favorite."
        ]
    },
    {
        id: 40, title: "YMCA", src: `${SNIP}/YMCA_snip.mp3`,
        category: "pop", tempo: "fast", durationSec: 10,
        clues: [
            "💃 This song has an iconic four-letter dance move everyone knows.",
            "🏟️ It's played at virtually every sporting event during breaks.",
            "🎤 Village People's 1978 disco anthem and crowd participation classic."
        ]
    },
];

/**
 * Resolved tune library — all `src` fields are absolute or correctly prefixed.
 * This is the ONLY export that game components should consume.
 */
export const TUNES = RAW_TUNES.map(tune => ({
    ...tune,
    src: resolveSrc(tune.src),
}));

/**
 * Get tunes filtered by category.
 * @param {string} category - e.g., "stand-tune", "classic", "rock"
 * @returns {Array} filtered tunes
 */
export const getTunesByCategory = (category) =>
    TUNES.filter(t => t.category === category);

/**
 * Get a tune by its stable ID.
 * @param {number} id
 * @returns {object|undefined}
 */
export const getTuneById = (id) =>
    TUNES.find(t => t.id === id);

/**
 * All unique categories in the library.
 */
export const CATEGORIES = [...new Set(TUNES.map(t => t.category))];
