// @ts-expect-error The exact BetweenBands components are JavaScript modules.
import { ExactGame } from "@/components/betweenbands/ExactGames";
import { notFound } from "next/navigation";
import { pageMetadata, seoPages } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = `/play/${slug}`;
  if (!seoPages[path]) notFound();
  return pageMetadata(path);
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!seoPages[`/play/${slug}`]) notFound();
  return <ExactGame slug={slug} />;
}
