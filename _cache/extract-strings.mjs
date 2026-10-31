import fs from "fs";

const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const uniq = (values) => [...new Set(values)].sort();

const apis = [...s.matchAll(/["'`](\/api\/[^"'`\s]{1,180})["'`]/g)].map((m) => m[1]);
const abs = [...s.matchAll(/https?:\/\/[^"'`\s]{4,180}/g)].map((m) => m[0]);
const timeframes = [...s.matchAll(/["'`](1m|3m|5m|15m|30m|1h|2h|4h|1d|1w|1M|1mo|1y|day|week|month)["'`]/g)].map((m) => m[1]);

const keywords = [
  "demand",
  "supply",
  "confluence",
  "bos",
  "choch",
  "rsi",
  "macd",
  "vwap",
  "atr",
  "fibonacci",
  "supertrend",
  "bollinger",
  "engulf",
  "websocket",
  "socket",
];

const hits = {};
for (const word of keywords) {
  const re = new RegExp(word, "ig");
  hits[word] = (s.match(re) || []).length;
}

const routeLike = [...s.matchAll(/["'`](\/[a-zA-Z0-9_./:-]{1,80})["'`]/g)]
  .map((m) => m[1])
  .filter((p) => !p.startsWith("/api/") && !p.startsWith("/assets/") && !p.startsWith("/brand/"));

fs.writeFileSync(
  new URL("./strings.json", import.meta.url),
  JSON.stringify(
    {
      apis: uniq(apis),
      urls: uniq(abs).slice(0, 200),
      timeframes: uniq(timeframes),
      keywordCounts: hits,
      routeLike: uniq(routeLike).slice(0, 400),
    },
    null,
    2,
  ),
);
console.log("apis", uniq(apis).length, "routes", uniq(routeLike).length);
