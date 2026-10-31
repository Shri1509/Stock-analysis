import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
for (const n of ["function wb(", "function Ud("]) {
  const i = s.indexOf(n);
  console.log("\n====", n, i, "====");
  if (i >= 0) console.log(s.slice(i, i + 500));
}
