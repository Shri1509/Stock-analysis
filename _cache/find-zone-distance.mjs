import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
let from = 0;
let n = 0;
while (n < 15) {
  const i = s.indexOf("Zone Distance", from);
  if (i < 0) break;
  console.log("\n@" + i + " " + s.slice(i - 180, i + 80).replace(/\s+/g, " "));
  from = i + 10;
  n++;
}
console.log("count", n);
