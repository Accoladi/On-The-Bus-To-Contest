// @ts-expect-error The exact BetweenBands component is a JavaScript module.
import { ExactActivity } from "@/components/betweenbands/ExactGames";

export default async function ColoringBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExactActivity slug="coloring" templateId={id} />;
}
