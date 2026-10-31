import fs from "fs";

const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
const apis = [];
let from = 0;
while (true) {
  const i = s.indexOf("/api/", from);
  if (i < 0) break;
  let j = i;
  while (j < s.length && !"`'\" \n,)}.])".includes(s[j])) j++;
  apis.push(s.slice(i, j));
  from = i + 5;
}
const uniq = [...new Set(apis)].sort();
console.log(uniq.join("\n"));
console.log("---", uniq.length);
