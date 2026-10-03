import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/books");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
