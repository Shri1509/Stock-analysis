import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
for (const k of ["oppositeZones", "target=", "nearestOpposite", "entry:", "stop:"]) {
  const i = s.indexOf(k);
  console.log("\n##", k, "count", s.split(k).length - 1, "at", i);
  if (i >= 0) console.log(s.slice(i - 80, i + 360).replace(/\s+/g, " "));
}
