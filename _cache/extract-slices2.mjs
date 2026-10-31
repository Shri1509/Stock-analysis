import fs from "fs";
const s = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
function around(needle, n = 2, pad = 400) {
  const out = [];
  let from = 0;
  for (let i = 0; i < n; i++) {
    const at = s.indexOf(needle, from);
    if (at < 0) break;
    out.push(`\n===== ${needle} @${at} =====\n` + s.slice(at - 80, at + pad));
    from = at + needle.length;
  }
  return out.join("\n");
}
const text = [
  around("window.open", 4, 250),
  around("maType", 3, 200),
  around("leg_out_range", 1, 900),
  around("Zone Distance", 2, 200),
].join("\n");
fs.writeFileSync(new URL("./slices2.txt", import.meta.url), text);
console.log(text.length);
