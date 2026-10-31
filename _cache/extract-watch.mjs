import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const i = s.indexOf('h<5?"NEAR"');
console.log(s.slice(i - 1600, i + 700));
