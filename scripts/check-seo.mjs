import assert from "node:assert/strict";

const base = process.env.SEO_TEST_URL || "http://127.0.0.1:3000";
const origin = "https://www.onthebustocontest.com";
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(urls.length >= 34);
assert.equal(new Set(urls).size, urls.length);
assert(urls.every((url) => url.startsWith(origin)));
assert(urls.includes(`${origin}/read/celebrities-marching-band`));
assert(!urls.some((url) => url.includes("/api/")));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
for (const path of ["/", "/read", "/read/celebrities-marching-band", "/play/trivia", "/books/before-the-first-note", "/contact"]) {
  const response = await fetch(`${base}${path}`, { headers: { "User-Agent": "Googlebot" } });
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `canonical exists: ${path}`);
  assert.equal(new URL(canonical).href, new URL(`${origin}${path}`).href, `canonical: ${path}`);
  assert(html.includes('property="og:title"'), `sharing title: ${path}`);
  assert(html.includes('name="description"'), `description: ${path}`);
}
assert.equal((await fetch(`${base}/play/not-a-game`)).status, 404);
console.log(`SEO checks passed: ${urls.length} sitemap URLs, robots, canonical URLs, sharing tags, and 404 handling.`);
