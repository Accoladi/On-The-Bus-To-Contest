// @ts-expect-error The exact BetweenBands components are JavaScript modules.
import { ExactActivity } from "@/components/betweenbands/ExactGames";
import { notFound } from "next/navigation";
import { pageMetadata, seoPages } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = `/activities/${slug}`;
  if (!seoPages[path]) notFound();
  return pageMetadata(path);
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!seoPages[`/activities/${slug}`]) notFound();
  return <ExactActivity slug={slug} />;
}
