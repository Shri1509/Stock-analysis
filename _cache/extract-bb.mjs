import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const at = s.indexOf("const bb=");
fs.writeFileSync(new URL("./bb.txt", import.meta.url), s.slice(at, at + 1800));
const keys = ["Zone Distance", "zone-watch", "zoneWatch", "view=zones", '"zones"', "confluence"];
for (const k of keys) {
  const i = s.indexOf(k);
  console.log("\n##", k, i);
  if (i >= 0) console.log(s.slice(i - 120, i + 220).replace(/\s+/g, " "));
}
