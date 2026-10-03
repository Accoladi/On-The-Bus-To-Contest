import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/books/making-friends");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
