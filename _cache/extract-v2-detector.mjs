import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const start = s.indexOf("function Yw(");
const end = s.indexOf("function bM(");
fs.writeFileSync(new URL("./v2-detector.txt", import.meta.url), s.slice(start, end));
console.log("len", end - start, "start", start);
