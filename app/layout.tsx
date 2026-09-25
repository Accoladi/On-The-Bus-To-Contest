import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "On the Bus to Contest",
  description: "A marching-band companion for the journey to contest day.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
