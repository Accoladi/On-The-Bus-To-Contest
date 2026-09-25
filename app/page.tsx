import { HomeHero } from "@/components/home/HomeHero";
import { RadioSection } from "@/components/home/RadioSection";
import { GamesSection } from "@/components/home/GamesSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <RadioSection />
      <GamesSection />
      <ActivitiesSection />
    </main>
  );
}
