import { NextResponse } from "next/server";
import { curateRadioSongs } from "@/lib/radioCatalog";
import type { RadioSong } from "@/components/radio/types";

const DEFAULT_RADIO_UPSTREAM = "https://bandcampnation.com/api/radio/songs";
const UPSTREAM_TIMEOUT_MS = 10_000;
const UPSTREAM_ATTEMPTS = 2;

export const revalidate = 60;

async function fetchRadioCatalog(upstream: string) {
  let lastError: unknown;

  for (let attempt = 0; attempt < UPSTREAM_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    try {
      const response = await fetch(upstream, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
        signal: controller.signal,
      });

      if (response.ok || attempt === UPSTREAM_ATTEMPTS - 1) return response;
    } catch (error) {
      lastError = error;
      if (attempt < UPSTREAM_ATTEMPTS - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Unable to load radio catalog");
}

export async function GET() {
  const upstream = process.env.RADIO_UPSTREAM_URL || DEFAULT_RADIO_UPSTREAM;

  try {
    const response = await fetchRadioCatalog(upstream);

    if (!response.ok) {
      return NextResponse.json(
        { error: "The radio catalog is temporarily unavailable." },
        { status: 502 },
      );
    }

    const payload: unknown = await response.json();

    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { songs?: unknown }).songs)) {
      return NextResponse.json(
        { error: "The radio catalog returned an invalid response." },
        { status: 502 },
      );
    }

    const songs = curateRadioSongs((payload as { songs: RadioSong[] }).songs);

    return NextResponse.json({ ...payload, songs }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to the radio catalog." },
      { status: 502 },
    );
  }
}
