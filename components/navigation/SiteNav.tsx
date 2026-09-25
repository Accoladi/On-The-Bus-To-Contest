"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "The Ride", href: "/the-ride" },
  { label: "Read", href: "/read" },
  { label: "Listen", href: "/listen" },
  { label: "Play", href: "/#games" },
  { label: "Create", href: "/#activities" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BusMark() {
  return (
    <svg aria-hidden="true" className="h-9 w-14 shrink-0 text-[var(--gold)]" viewBox="0 0 72 42" fill="none">
      <path d="M7 31V12c0-4 3-7 7-7h35c7 0 12 4 15 11l3 9v6H7Z" fill="currentColor" />
      <path d="M13 11h34v10H13V11Zm38 0c4 1 7 4 9 10H51V11Z" fill="var(--navy)" />
      <path d="M8 34h54M17 34a5 5 0 1 0 0 1m35-1a5 5 0 1 0 0 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M7 27h60" stroke="var(--navy)" strokeWidth="2" />
    </svg>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-[rgba(7,26,47,0.22)] backdrop-blur-[2px]" aria-label="Main navigation">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-[54px]">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <BusMark />
          <span className="font-display text-[clamp(1.15rem,2vw,1.75rem)] leading-none text-white">
            On the Bus to Contest
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative py-7 text-[15px] font-semibold transition-colors hover:text-[var(--champagne)] ${index === 0 ? "text-[var(--gold)] after:absolute after:bottom-[12px] after:left-1/2 after:h-[3px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-[var(--gold)]" : "text-white/90"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/the-ride" className="flex items-center gap-3 rounded-full bg-[var(--gold)] px-7 py-3 text-[15px] font-bold text-[var(--navy)] shadow-lg transition hover:bg-[var(--champagne)]">
            Start the Ride <ArrowIcon />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="rounded-full border border-white/25 p-2 text-white lg:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            {open ? <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/15 bg-[var(--navy)] px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {links.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10 hover:text-[var(--gold)]">
                {link.label}
              </Link>
            ))}
            <Link href="/the-ride" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]">
              Start the Ride <ArrowIcon />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
