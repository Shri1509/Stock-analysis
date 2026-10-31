import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");

function sliceAt(needle, pad = 1500, before = 200) {
  const at = s.indexOf(needle);
  if (at < 0) return needle + " MISSING";
  return s.slice(Math.max(0, at - before), at + pad);
}

const parts = [
  "===== bb =====\n" + sliceAt("bb={", 2500, 0),
  "===== const bb =====\n" + sliceAt("const bb=", 2500, 0),
  "===== decisionScore: =====\n" + sliceAt("decisionScore:", 1800, 400),
  "===== adjustment =====\n" + sliceAt("adjustment:", 800, 200),
];
fs.writeFileSync(new URL("./v2-config.txt", import.meta.url), parts.join("\n\n"));
console.log(parts.map((p) => p.slice(0, 80).replace(/\n/g, " ")).join("\n"));
