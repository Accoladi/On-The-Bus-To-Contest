// ============================================================================
// fightSongsData.js — College Fight Songs library for "Name That College"
// ============================================================================
//
// Each entry pairs a college fight song with the school it belongs to.
// Audio is played via the YouTube IFrame API (see useYouTubePlayer.js), so
// every song carries a `youtubeId`. Source of truth for the IDs/colleges is
// the College Fight Songs crossword data (fightSongCrosswordData.js).
//
// The GAME asks the player to name the COLLEGE after hearing the song — the
// opposite of the crossword. The song title is only ever shown as a partial
// "clue" (see obfuscateSongName) to nudge without giving it away.
// ============================================================================

/**
 * @typedef {Object} CollegeSong
 * @property {number} id         - stable unique id
 * @property {string} college    - the answer the player must pick
 * @property {string} song       - the fight song's real name (clue #2, teased)
 * @property {string} colors     - team colors (clue #1)
 * @property {string} mascot     - team mascot / nickname (clue #3)
 * @property {string} youtubeId  - YouTube video id used for audio playback
 */

/** @type {CollegeSong[]} */
export const COLLEGE_SONGS = [
  { id: 1, college: 'University of Oklahoma', song: 'Boomer Sooner', colors: 'Crimson and Cream', mascot: 'Sooners (Boomer & Sooner)', youtubeId: '5ErtzJSUiQY' },
  { id: 2, college: 'University of Wisconsin', song: 'On, Wisconsin!', colors: 'Cardinal and White', mascot: 'Badgers (Bucky Badger)', youtubeId: 'DPwDoTbRDag' },
  { id: 3, college: 'University of Iowa', song: 'Iowa Fight Song', colors: 'Black and Gold', mascot: 'Hawkeyes (Herky the Hawk)', youtubeId: 'l4ANP8g8wrE' },
  { id: 4, college: 'University of Tennessee', song: 'Rocky Top', colors: 'Orange and White', mascot: 'Volunteers (Smokey)', youtubeId: 'vDDy8_H2XnA' },
  { id: 5, college: 'Auburn University', song: 'War Eagle', colors: 'Orange and Navy Blue', mascot: 'Tigers (Aubie)', youtubeId: 'sMvdigCaGh8' },
  { id: 6, college: 'University of Georgia', song: 'Hail to Georgia', colors: 'Red and Black', mascot: 'Bulldogs (Uga)', youtubeId: '_Hodv8GTajg' },
  { id: 7, college: 'University of Alabama', song: 'Yea Alabama', colors: 'Crimson and White', mascot: 'Crimson Tide (Big Al)', youtubeId: '0GBp1qY_lWI' },
  { id: 8, college: 'University of Florida', song: 'The Orange and Blue', colors: 'Orange and Blue', mascot: 'Gators (Albert & Alberta)', youtubeId: 'dq1PPmUQKjY' },
  { id: 9, college: 'Ohio State University', song: 'Across the Field', colors: 'Scarlet and Gray', mascot: 'Buckeyes (Brutus)', youtubeId: 'uDI1qWHqJt4' },
  { id: 10, college: 'Clemson University', song: 'Tiger Rag', colors: 'Orange and Purple', mascot: 'Tigers (The Tiger)', youtubeId: 'tGl_XIGlhfw' },
  { id: 11, college: 'University of Nebraska', song: 'Hail Varsity', colors: 'Scarlet and Cream', mascot: 'Cornhuskers (Herbie Husker)', youtubeId: 'sT3nNOFffbA' },
  { id: 12, college: 'University of Southern California', song: 'Fight On', colors: 'Cardinal and Gold', mascot: 'Trojans (Tommy Trojan)', youtubeId: 'xh_oEsfHxtQ' },
  { id: 13, college: 'University of Notre Dame', song: 'Notre Dame Victory March', colors: 'Blue and Gold', mascot: 'Fighting Irish (Leprechaun)', youtubeId: 'BLEcm7S1WsY' },
  { id: 14, college: 'Purdue University', song: 'Hail Purdue', colors: 'Old Gold and Black', mascot: 'Boilermakers (Purdue Pete)', youtubeId: 'YBPCo2j9s3w' },
  { id: 15, college: 'University of Michigan', song: 'The Victors', colors: 'Maize and Blue', mascot: 'Wolverines', youtubeId: 'H80UZVzIbzg' },
  { id: 16, college: 'Florida State University', song: 'FSU Fight Song', colors: 'Garnet and Gold', mascot: 'Seminoles (Osceola & Renegade)', youtubeId: '5qY-5SBY6UA' },
  { id: 17, college: 'UCLA', song: 'Sons of Westwood', colors: 'Blue and Gold', mascot: 'Bruins (Joe Bruin)', youtubeId: 'p6WthgDvUSY' },
  { id: 18, college: 'Louisiana State University', song: 'Fight for LSU', colors: 'Purple and Gold', mascot: 'Tigers (Mike the Tiger)', youtubeId: 'Dsfte9YHoX0' },
  { id: 19, college: 'Georgia Tech', song: "Ramblin' Wreck from Georgia Tech", colors: 'Old Gold and White', mascot: 'Yellow Jackets (Buzz)', youtubeId: 'ZOBt0qTujho' },
  { id: 20, college: 'Indiana University', song: 'Indiana, Our Indiana', colors: 'Cream and Crimson', mascot: 'Hoosiers', youtubeId: '5gj1qq7p-YQ' },
  { id: 21, college: 'University of Washington', song: 'Bow Down to Washington', colors: 'Purple and Gold', mascot: 'Huskies (Harry the Husky)', youtubeId: '24Y4aT52ekU' },
  { id: 22, college: 'University of Oregon', song: 'Mighty Oregon', colors: 'Green and Yellow', mascot: 'Ducks (The Oregon Duck)', youtubeId: 'q4TvpCpslMQ' },
  { id: 23, college: 'Harvard University', song: 'Ten Thousand Men of Harvard', colors: 'Crimson', mascot: 'The Crimson (John Harvard)', youtubeId: 'Xeuu_NprSAU' },
  { id: 24, college: 'Army (West Point)', song: 'On, Brave Old Army Team', colors: 'Black, Gold, and Gray', mascot: 'Black Knights (Army Mule)', youtubeId: 'OMEqkdoEXXQ' },
  { id: 25, college: 'University of Texas', song: 'Texas Fight', colors: 'Burnt Orange and White', mascot: 'Longhorns (Bevo)', youtubeId: 'JCH1SdRYA40' },
  { id: 26, college: 'Navy (Annapolis)', song: 'Anchors Aweigh', colors: 'Navy Blue and Gold', mascot: 'Midshipmen (Bill the Goat)', youtubeId: 'j72CJaDWSA8' },
  { id: 27, college: 'Texas A&M University', song: 'Aggie War Hymn', colors: 'Maroon and White', mascot: 'Aggies (Reveille)', youtubeId: 'KpRuDylcttY' },
  { id: 28, college: 'Michigan State University', song: 'Victory for MSU', colors: 'Green and White', mascot: 'Spartans (Sparty)', youtubeId: 's4WUCE4U488' },
];

/**
 * Other real college FOOTBALL programs used as distractor options.
 *
 * These are all schools with well-known football teams (but NOT among the 28
 * fight songs above), so every wrong choice is still a plausible football
 * school — that makes the guess genuinely tricky instead of an obvious "which
 * one isn't a real team". None of these overlap with the schools in
 * COLLEGE_SONGS.
 *
 * @type {string[]}
 */
export const OTHER_FOOTBALL_COLLEGES = [
  'Penn State University',
  'University of Minnesota',
  'University of Illinois',
  'Northwestern University',
  'Rutgers University',
  'University of Maryland',
  'University of Missouri',
  'University of Kentucky',
  'Vanderbilt University',
  'Mississippi State University',
  'University of Mississippi',
  'University of Arkansas',
  'University of South Carolina',
  'Oklahoma State University',
  'University of Kansas',
  'Kansas State University',
  'Iowa State University',
  'Baylor University',
  'Texas Christian University',
  'Texas Tech University',
  'West Virginia University',
  'University of Cincinnati',
  'University of Houston',
  'University of Central Florida',
  'University of Miami',
  'Virginia Tech',
  'University of Virginia',
  'NC State University',
  'University of North Carolina',
  'Duke University',
  'Wake Forest University',
  'Boston College',
  'University of Pittsburgh',
  'Syracuse University',
  'University of Louisville',
  'Stanford University',
  'University of California',
  'University of Arizona',
  'Arizona State University',
  'University of Utah',
  'University of Colorado',
  'Washington State University',
  'Oregon State University',
  'Brigham Young University',
  'Boise State University',
  'United States Air Force Academy',
];

/**
 * Turn a song title into a teasing partial clue.
 *
 * - Long / multi-word titles collapse to spaced initials  →  "N. D. V. M."
 * - Shorter titles reveal the first ~half of each word     →  "Boo___ Soo___"
 *
 * The goal is to hint at the song without handing over the answer.
 *
 * @param {string} name
 * @returns {string}
 */
export function obfuscateSongName(name) {
  const words = name.split(/\s+/).filter(Boolean);
  const letterCount = name.replace(/[^A-Za-z]/g, '').length;

  // Big titles → initials only.
  if (letterCount > 12 || words.length >= 4) {
    return words
      .map((w) => (w[0] ? w[0].toUpperCase() : ''))
      .filter(Boolean)
      .join('. ') + '.';
  }

  // Otherwise reveal the first half of each word, mask the rest.
  return words
    .map((w) => {
      const letters = w.replace(/[^A-Za-z]/g, '');
      if (letters.length <= 1) return w; // keep tiny words / punctuation as-is
      const keep = Math.ceil(letters.length / 2);
      return w.slice(0, keep) + '_'.repeat(Math.max(0, w.length - keep));
    })
    .join(' ');
}
