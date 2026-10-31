import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
for (const k of ["LONG", "away", "watch", "target ", "entryPrice", "riskReward", "4.06"]) {
  const i = s.indexOf(k);
  console.log("\n##", k, i);
  if (i >= 0) console.log(s.slice(Math.max(0, i - 100), i + 300).replace(/\s+/g, " "));
}
