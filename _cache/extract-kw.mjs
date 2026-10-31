import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const i = s.indexOf("function Kw(");
const j = s.indexOf("function Xw(");
console.log("Xw", j);
console.log(s.slice(i, i + 4500));
console.log("\n\n==== Xw ====\n");
if (j >= 0) console.log(s.slice(j, j + 1800));
