import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/books/before-the-first-note");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
