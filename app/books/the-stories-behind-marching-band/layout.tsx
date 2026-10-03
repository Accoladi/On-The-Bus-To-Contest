import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/books/the-stories-behind-marching-band");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
