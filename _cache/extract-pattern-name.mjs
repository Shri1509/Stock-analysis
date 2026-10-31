import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const i = s.indexOf("leg-out forms");
console.log(s.slice(i - 1800, i + 900));
console.log("\n\n==== SCORE ====\n");
const j = s.indexOf('["base_count"');
console.log(s.slice(j - 200, j + 2200));
