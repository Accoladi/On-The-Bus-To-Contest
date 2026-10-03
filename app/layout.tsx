import type { Metadata } from "next";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import "./globals.css";
import { siteUrl, siteName, siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  robots: { index: true, follow: true },
  icons: { icon: "/images/logo/logo.png", apple: "/images/logo/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, description: siteDescription }) }} />{children}<SiteFooter /></body>
    </html>
  );
}
