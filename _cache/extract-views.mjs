import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const views = [...s.matchAll(/view=([a-z0-9_-]+)/g)].map((m) => m[1]);
console.log([...new Set(views)].sort().join("\n"));
const i = s.indexOf("function CC(");
console.log("\nCC", s.slice(i, i + 700));
const j = s.indexOf('new Set(["sma"');
console.log("\nMA", s.slice(Math.max(0, s.indexOf("Aw=new Set")), s.indexOf("Aw=new Set") + 250));
