import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
for (const n of ["REACTING", "WATCHING", "baseWeight", "Math.min(100", "decisionScore"]) {
  let i = 0, c = 0;
  while ((i = s.indexOf(n, i)) >= 0 && c < 3) {
    console.log("\n==== " + n + " @" + i + " ====");
    console.log(s.slice(Math.max(0, i - 180), i + 280));
    i += n.length;
    c++;
  }
}
