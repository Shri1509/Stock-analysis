import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const needles = [
  "normal-base",
  "exceptional-leg-in",
  "no-base-rd-combined",
  "body-to-wick",
  "base_count",
  "impulseBodyRatio",
  "broken_by_close",
  "minZoneScore",
];
for (const n of needles) {
  const i = s.indexOf(n);
  console.log("\n==== " + n + " @" + i + " ====");
  if (i < 0) continue;
  console.log(s.slice(Math.max(0, i - 400), i + 700));
}
