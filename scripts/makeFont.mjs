import { readFileSync, writeFileSync } from "fs";
const ttf = readFileSync("scripts/NotoSans-Regular.ttf");
writeFileSync(
  "src/utils/notoSans.js",
  `export const notoSansBase64 = "${ttf.toString("base64")}";\n`,
);
console.log("done -> src/utils/notoSans.js");
