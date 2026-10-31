import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const i = s.indexOf('["base_count"');
fs.writeFileSync(new URL("./v2-score.txt", import.meta.url), s.slice(i, i + 2200));
const j = s.indexOf("view:\"chart\"");
const views = [];
let from = 0;
while (views.length < 30) {
  const at = s.indexOf('view:"', from);
  if (at < 0) break;
  views.push(s.slice(at, at + 40));
  from = at + 6;
}
fs.appendFileSync(new URL("./v2-score.txt", import.meta.url), "\n\nVIEWS\n" + [...new Set(views)].join("\n"));
console.log("score at", i);
