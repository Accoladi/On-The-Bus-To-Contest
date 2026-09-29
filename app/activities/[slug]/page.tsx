// @ts-expect-error The exact BetweenBands components are JavaScript modules.
import { ExactActivity } from "@/components/betweenbands/ExactGames";

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExactActivity slug={slug} />;
}
