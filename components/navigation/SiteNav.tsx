"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Radio", href: "/listen" },
  { label: "Articles", href: "/read" },
  { label: "Games", href: "/play" },
  { label: "Activities", href: "/activities" },
  { label: "Books", href: "/books" },
];

export function SiteNav({ light = false, solid = false }: { light?: boolean; solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={`absolute inset-x-0 top-0 z-20 border-b ${light ? "border-[var(--navy)]/10 bg-[var(--cream)]" : solid ? "border-white/15 bg-[var(--navy)]" : "border-white/15 bg-[rgba(7,26,47,0.22)] backdrop-blur-[2px]"}`} aria-label="Main navigation">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-[54px]">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/images/logo/logo.png" alt="" width={68} height={68} priority className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(231,184,75,0.28)] sm:h-16 sm:w-16" />
          <span className={`font-display text-[clamp(0.95rem,1.35vw,1.3rem)] font-normal leading-none ${light ? "text-[var(--navy)]/75" : "text-white/82"}`}>
            On the Bus to Contest
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
            <Link
              key={link.label}
              href={link.href}
              className={`relative py-7 text-[15px] font-semibold transition-colors hover:text-[var(--purple)] ${active ? "text-[var(--gold)] after:absolute after:bottom-[12px] after:left-1/2 after:h-[3px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-[var(--gold)]" : light ? "text-[var(--navy)]/80" : "text-white/90"}`}
            >
              {link.label}
            </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className={`rounded-full border p-2 lg:hidden ${light ? "border-[var(--navy)]/25 text-[var(--navy)]" : "border-white/25 text-white"}`}
          onClick={() => setOpen((current) => !current)}
        >
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            {open ? <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className={`border-t px-6 py-5 lg:hidden ${light ? "border-[var(--navy)]/10 bg-[var(--cream)]" : "border-white/15 bg-[var(--navy)]"}`}>
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {links.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 hover:bg-[var(--purple)]/10 hover:text-[var(--purple)] ${light ? "text-[var(--navy)]/90" : "text-white/90"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
