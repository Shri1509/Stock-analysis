import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");

function all(needle, limit = 12, pad = 180) {
  const hits = [];
  let from = 0;
  while (hits.length < limit) {
    const at = s.indexOf(needle, from);
    if (at < 0) break;
    hits.push(s.slice(Math.max(0, at - 60), at + pad).replace(/\s+/g, " "));
    from = at + needle.length;
  }
  return hits;
}

const views = [...s.matchAll(/view[=:]["']?([a-z0-9_-]+)/g)].map((m) => m[1]);
const lt = s.indexOf("Lt=new Set") >= 0 ? s.indexOf("Lt=new Set") : s.indexOf("Lt=new Set(");
let ltText = "";
const ltAt = s.search(/Lt=new Set\(/);
if (ltAt >= 0) ltText = s.slice(ltAt, ltAt + 400);

const out = {
  views: [...new Set(views)].sort(),
  ltAt,
  ltText,
  decision: all("decisionScore", 6, 220),
  patternAssign: all("pattern:ie", 3, 120),
};
fs.writeFileSync(new URL("./views-extract.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(out.views.join(","));
console.log("lt", ltAt);
