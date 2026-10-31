import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const i = s.indexOf("riskReward==null");
fs.writeFileSync(new URL("./report-row.txt", import.meta.url), s.slice(i - 2500, i + 400));
const j = s.indexOf("HTF +");
console.log("htf", j);
if (j >= 0) console.log(s.slice(j - 400, j + 200).replace(/\s+/g, " "));
