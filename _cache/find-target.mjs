import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const needles = ["targetPrice", "riskReward", "htfAdjustment", "LONG", "away", "watch", "dashboard", "Setup Dashboard", "roleClarity", "closeBreak"];
for (const k of needles) {
  let from = 0;
  let n = 0;
  console.log("\n====", k, "count", s.split(k).length - 1);
  while (n < 2) {
    const i = s.indexOf(k, from);
    if (i < 0) break;
    console.log(s.slice(Math.max(0, i - 140), i + 220).replace(/\s+/g, " "));
    from = i + k.length;
    n++;
  }
}
