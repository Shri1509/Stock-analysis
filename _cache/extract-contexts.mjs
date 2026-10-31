import fs from "fs";

const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const needles = [
  "/api/",
  "instruments",
  "timeframe",
  "demandZone",
  "supplyZone",
  "zoneDistance",
  "confluence",
  "websocket",
  "WebSocket",
  "candle",
  "ATR",
  "RSI",
  "backtest",
  "tradePlan",
  "entry",
  "stopLoss",
  "target",
];

const out = [];
for (const needle of needles) {
  let from = 0;
  let count = 0;
  const samples = [];
  while (count < 8) {
    const i = s.indexOf(needle, from);
    if (i < 0) break;
    samples.push(s.slice(Math.max(0, i - 80), Math.min(s.length, i + needle.length + 140)).replace(/\s+/g, " "));
    from = i + needle.length;
    count++;
  }
  out.push({ needle, total: s.split(needle).length - 1, samples });
}

fs.writeFileSync(new URL("./contexts.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(out.map((x) => `${x.needle}: ${x.total}`).join("\n"));
