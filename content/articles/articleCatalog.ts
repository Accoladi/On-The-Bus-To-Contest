export type ArticleSummary = {
  slug: string;
  category: string;
  title: string;
  description: string;
  readingTime: string;
  date: string;
  image: string;
  featured?: boolean;
};

export const articleCatalog: ArticleSummary[] = [
  { slug: "calm-your-mind", category: "Mindset", title: "7 Ways to Calm Your Mind Before the Contest", description: "You are on the bus. The uniforms are packed. Here are simple, practical ways to quiet your mind and get ready to perform your best.", readingTime: "5 min read", date: "Sep 12, 2025", image: "/images/articles/article-title-pics/calm-your-mind.png", featured: true },
  { slug: "job-not-perfect", category: "Confidence", title: "Your Job Is Not to Be Perfect", description: "It is normal to feel nervous. Here is what to remember when the what-if-I-mess-up thoughts start creeping in.", readingTime: "4 min read", date: "Sep 8, 2025", image: "/images/articles/article-title-pics/job-not-perfect.png" },
  { slug: "person-beside-you", category: "People", title: "The Person Beside You May Need You", description: "A kind word, a simple conversation, or just being there can make a bigger difference than you realize.", readingTime: "6 min read", date: "Sep 5, 2025", image: "/images/articles/article-title-pics/person-needs-you.png" },
  { slug: "director-seems-different", category: "Directors", title: "Your Director Seems Different Today — There’s a Reason", description: "Contest day is a big day for them too. Here is what they are thinking about, and how you can support them.", readingTime: "5 min read", date: "Aug 28, 2025", image: "/images/articles/article-title-pics/director-seems-different.png" },
  { slug: "quiet-before-first-note", category: "Mindset", title: "The Quiet Before the First Note", description: "Meditation does not have to be complicated. On the bus, it can be as simple as being still, breathing, listening, and noticing.", readingTime: "7 min read", date: "Aug 24, 2025", image: "/images/articles/article-title-pics/meditation.png" },
  { slug: "laughter-best-medicine", category: "Wellbeing", title: "Laughter May Be the Best Medicine", description: "A little laughter can loosen the grip of a nervous moment and remind you that contest day is still a day with your people.", readingTime: "4 min read", date: "Aug 20, 2025", image: "/images/articles/article-title-pics/laughter-being-medicine.png" },
  { slug: "look-beside-you", category: "Community", title: "Look Beside You", description: "The people sharing the bus, the rehearsal, and the field are part of what makes the experience matter.", readingTime: "5 min read", date: "Aug 16, 2025", image: "/images/articles/article-title-pics/person-needs-you.png" },
  { slug: "before-field", category: "Preparation", title: "Before You Step Onto the Field", description: "Take one good breath, trust the work you have done, and give the next moment your full attention.", readingTime: "5 min read", date: "Aug 12, 2025", image: "/images/articles/article-title-bgs/before-band-takes-field.png" },
  { slug: "bus-ride-diary", category: "Stories", title: "The Bus Ride: More Than Just a Ride", description: "The ride is loud, chaotic, and full of the small memories that stay with you long after the final note.", readingTime: "4 min read", date: "Aug 8, 2025", image: "/images/articles/article-title-pics/busband-diary.png" },
];
