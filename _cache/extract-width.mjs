import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const j = s.indexOf('["base_count","Base count"');
console.log(s.slice(j - 900, j + 80));
