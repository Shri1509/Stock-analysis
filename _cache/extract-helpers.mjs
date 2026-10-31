import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const names = ["function jb(", "function ar(", "function uc(", "function nM(", "function zv(", "function $d(", "function Hd(", "function Vd(", "function iM(", "function Pw(", "function cc(", "function Zd(", "function Cb(", "function Tb(", "function _b(", "function qd(", "function Kw(", "function Ja(", "function Jn("];
for (const n of names) {
  const i = s.indexOf(n);
  console.log("\n==== " + n + " @" + i + " ====");
  if (i < 0) continue;
  console.log(s.slice(i, i + 900));
}
