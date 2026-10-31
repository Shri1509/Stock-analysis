import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const needles = ["perfect", "good", "average", "fresh", "broken_by_close", "DIT", "MIT", "60m", "algorithmVersion", "decisionScore", "proximal", "indicator"];
for (const needle of needles) {
  const i = s.indexOf(needle);
  console.log("\n##", needle, "count", s.split(needle).length - 1, "at", i);
  if (i >= 0) console.log(s.slice(Math.max(0, i - 120), i + 180).replace(/\s+/g, " "));
}
