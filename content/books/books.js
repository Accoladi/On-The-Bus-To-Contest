import { soundOfHomeSections } from './soundOfHomeSections';

export const books = [
  {
    slug: 'the-stories-behind-marching-band',
    title: 'The Stories Behind Marching Band',
    subtitle: 'Every Tradition Has a Story. Every Rehearsal Continues It.',
    author: 'Dr. Randall Bayne',
    excerpt: 'A journey through more than 2,000 years of music, discipline, tradition, and the story behind American marching band.',
    coverImageUrl: '/images/books/stories-behind-marchingbandv3.png',
    chapterCount: 13,
    status: 'available',
    sections: [
      ['preface', 'Preface'],
      ['chapter-1', 'Chapter 1: Every August...'],
      ['chapter-2', 'Chapter 2: When Music Became a Weapon'],
      ['chapter-3', 'Chapter 3: The Sound of Freedom'],
      ['chapter-4', 'Chapter 4: A New Nation Finds Its Sound'],
      ['chapter-5', "Chapter 5: America's Greatest Musical Gift"],
      ['chapter-6', 'Chapter 6: When an Instrument Changed a Life'],
      ['chapter-7', 'Chapter 7: When Football Gave Bands Their Biggest Stage'],
      ['chapter-8', 'Chapter 8: When America Fell in Love with Bands'],
      ['chapter-9', 'Chapter 9: When America Discovered the High School Marching Band'],
      ['chapter-10', 'Chapter 10: When America Saw the Future'],
      ['chapter-11', 'Chapter 11: When Excellence Became a National Movement'],
      ['chapter-12', 'Chapter 12: The Best Bands Wanted One More Stage'],
      ['chapter-13', "Chapter 13: Now It's Your Turn"],
    ],
  },
  {
    slug: 'the-sound-of-home',
    title: 'The Sound of Home',
    subtitle: 'Book One of The Saturday Lights Series',
    author: 'Anna Laura Letterman',
    excerpt: 'Read the complete first book in The Saturday Lights Series.',
    coverImageUrl: '/images/books/soundofhomev3.png',
    chapterCount: 44,
    status: 'available',
    sections: soundOfHomeSections,
  },
  {
    slug: 'making-friends',
    title: 'Making Friends on the Band Bus',
    subtitle: 'How to Meet People, Make Someone Laugh, and Make the Ride Better for Everyone',
    author: 'On the Bus to Contest',
    excerpt: 'A practical guide to starting conversations, building friendships, and making the band bus feel more like home.',
    coverImageUrl: '/images/books/books-cover/making_friends.png',
    chapterCount: 42,
    status: 'available',
    sections: [],
  },
];

export function getBookBySlug(slug) {
  return books.find((book) => book.slug === slug);
}
