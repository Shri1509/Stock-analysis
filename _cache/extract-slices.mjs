import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const spots = [433700, 430700, 450700, 439200, 388500, 410200];
const parts = spots.map((i) => `\n\n===== @${i} =====\n` + s.slice(i, i + 1800));
fs.writeFileSync(new URL("./slices.txt", import.meta.url), parts.join("\n"));
console.log("ok", parts.join("\n").length);
