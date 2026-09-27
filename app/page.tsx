import { HomeHero } from "@/components/home/HomeHero";
import { RadioSection } from "@/components/home/RadioSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { GamesSection } from "@/components/home/GamesSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { BooksSection } from "@/components/home/BooksSection";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <ArticlesSection />
      <RadioSection />
      <GamesSection />
      <ActivitiesSection />
      <BooksSection />
    </main>
  );
}
