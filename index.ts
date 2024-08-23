import { parseArgs, styleText } from "node:util";
import { glob } from "node:fs/promises";
import { createReadStream } from "node:fs";

const options = {
  name: {
    type: "string" as const,
  },
};

const args = process.argv.slice(2); // Skip the first two elements (node and script path)
let name = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--name" && i + 1 < args.length) {
    name = args[i + 1];
    break;
  }
}

const { values, positionals } = parseArgs({ args, options });

console.log(values, positionals);
console.log(styleText(["yellow", "underline"], `Yellow underlined text - ${name}`));

console.log(import.meta.dirname);

for await (const file of glob(import.meta.dirname + "/*")) {
  console.log(styleText("red", file));
  if (file.endsWith("ts")) {
    const stream = createReadStream(file);

    for await (const chunk of stream) {
      console.log(styleText("green", chunk.toString().toUpperCase()));
    }
  }
}
