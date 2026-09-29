// @ts-expect-error The exact BetweenBands components are JavaScript modules.
import { ExactGame } from "@/components/betweenbands/ExactGames";

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExactGame slug={slug} />;
}
