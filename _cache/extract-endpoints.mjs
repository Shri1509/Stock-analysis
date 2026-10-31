import fs from "fs";

const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const needles = [
  "/api/zones/detect",
  "/api/zones/context",
  "/api/reports/zones",
  "/api/reports/confluence",
  "/api/candles?",
  "/api/instruments",
  "/api/report-universes",
  "/api/backtests",
  "timeframe",
];

const chunks = [];
for (const needle of ["/api/zones/detect", "/api/zones/context", "/api/reports/zones", "/api/reports/confluence", "/api/candles?", "/api/report-universes", "/api/dashboard/items"]) {
  let from = 0;
  let n = 0;
  while (n < 2) {
    const i = s.indexOf(needle, from);
    if (i < 0) break;
    chunks.push("\n===== " + needle + " @" + i + " =====\n" + s.slice(Math.max(0, i - 500), i + 700));
    from = i + needle.length;
    n++;
  }
}
fs.writeFileSync(new URL("./endpoint-context.txt", import.meta.url), chunks.join("\n"));
console.log("bytes", chunks.join("\n").length);
