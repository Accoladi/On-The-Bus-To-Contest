import type { Metadata } from "next";

export const siteUrl = "https://www.onthebustocontest.com";
export const siteName = "On the Bus to Contest";
export const siteDescription = "Make the ride to marching band contest count with music, articles, games, activities, and books for band students, directors, and families.";

export const seoPages: Record<string, { title: string; description: string }> = {
  "/": { title: "Marching Band Music, Games & Stories", description: siteDescription },
  "/listen": { title: "Marching Band Radio", description: "A contest-day soundtrack for the ride, the warm-up, and every moment between performances." },
  "/read": { title: "Marching Band Articles", description: "Read stories and advice about contest-day confidence, friendships, wellbeing, and college opportunities for marching band students." },
  "/play": { title: "Marching Band Games", description: "Play music trivia, crosswords, college fight-song challenges, and more on the bus to contest." },
  "/activities": { title: "Marching Band Activities", description: "Color, explore, and connect with marching band coloring pages and a contest-day scavenger hunt." },
  "/books": { title: "Marching Band Books", description: "Read books about marching band history, making friends on the band bus, and preparing for contest day." },
  "/about": { title: "About Us", description: "Discover On the Bus to Contest, a companion for band students, directors, and families on the journey to contest day." },
  "/contact": { title: "Contact Us", description: "Questions, ideas, or feedback? Get in touch with On the Bus to Contest." },
  "/books/before-the-first-note": { title: "Before the First Note", description: "A marching band companion for the ride there, the performance, and the journey home." },
  "/books/making-friends": { title: "Making Friends on the Band Bus", description: "Explore friendship, belonging, and connection through the experiences shared on the marching band bus." },
  "/books/the-stories-behind-marching-band": { title: "The Stories Behind Marching Band", description: "Discover the history, traditions, and stories that make marching band more than a performance." },
  "/play/name-that-tune": { title: "Name That Marching Band Tune", description: "Listen to marching band tunes and test your musical memory." },
  "/play/college-fight-songs": { title: "Name That College", description: "Listen to college fight songs and guess which school they belong to." },
  "/play/marching-band-crossword": { title: "Marching Band Terms Crossword", description: "Test your marching band vocabulary with interactive crossword puzzles." },
  "/play/halftime-hustle": { title: "The Dodging Judge", description: "Dodge the judge and collect music notes in this marching band runner game." },
  "/play/tic-tac-toe": { title: "Tic Tap Tone", description: "Play a musical take on tic-tac-toe with a friend." },
  "/play/trivia": { title: "Marching Band Trivia", description: "Challenge your knowledge of music and marching band." },
  "/activities/coloring": { title: "Marching Band Coloring Pages", description: "Create your own colorful marching band flags and hats with interactive coloring pages." },
  "/activities/scavenger-hunt": { title: "Marching Band Scavenger Hunt", description: "Notice, explore, and discover the details around you on contest day." },
};

export function pageMetadata(path: string, title = seoPages[path].title, description = seoPages[path].description, image = "/images/books/hero-bg.png", article = false): Metadata {
  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { title, description, url: `${siteUrl}${path}`, siteName, locale: "en_US", type: article ? "article" : "website", images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
