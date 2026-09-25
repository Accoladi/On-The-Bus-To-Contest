// The production catalog is loaded from BandCampNation's radio API.
const normalizeTitle = (title) => String(title || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();

export const HIDDEN_RADIO_SONG_TITLES = [
  'Band Camp and Pickle Juice',
  'Good Measure',
  'I Hate to Practice',
  'Kiss Me After You Shower',
  'Leave Mama in the Car',
  'Michael Farts When He Marches',
  'Speak to Yourself',
  'The Words We Choose',
  'Wake Up, Stand Up, Band Up',
  'The Small and Mighty Dot Book',
  "Our Drum Major's Hot",
  'On the Day You Want to Quit',
].map(normalizeTitle);

export const PRIORITIZED_RADIO_SONG_TITLES = [
  'The Ballad of Betty Band Booster',
  'Betty Band Booster',
  'Bettey Band Booster',
  'Maybe This Is the Point',
  'One Last Time for Him',
  'The Ballad of Tommy Thompson',
  'The Farmville Band',
  "My Mama Said Don't Date a Drummer",
  'Dolly Parton Marched in Her High School Band',
  'Daddy Said',
  'General Effect in the Stands',
  'Move That Line',
  'Parking Can Be Hell!',
].map(normalizeTitle);

const PRIORITY_BY_TITLE = new Map(PRIORITIZED_RADIO_SONG_TITLES.map((title, index) => [title, index]));

export function getRadioSongPriority(song) {
  return PRIORITY_BY_TITLE.get(normalizeTitle(song?.title)) ?? Number.MAX_SAFE_INTEGER;
}

export function filterRadioSongs(songs) {
  return songs
    .filter((song) => song?.status === 'published' && !song?.isRestricted && !HIDDEN_RADIO_SONG_TITLES.includes(normalizeTitle(song.title)))
    .sort((a, b) => getRadioSongPriority(a) - getRadioSongPriority(b));
}
