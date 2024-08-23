# Experiements with Node v22

## TypeScript Support

TypeScript support is built in.

`npm i typescript tsx`
`npm i --save-dev @types/node`

`node index.ts`

## Watch Mode

No more **Nodemon**, `--watch` flag is built in.

`node --watch index.ts`

## .env Support

No more **dotenv** just pass the `--env-file` flag to load a `.env` file.

`node --env-file=.env index.ts`

## Styling Text

```ts
import { styleText } from "node:util";

console.log(styleText(["yellow", "underline"], "Yellow underlined text"));
```

[Node.js styleText Documentation](https://nodejs.org/docs/latest/api/all.html#all_util_utilstyletextformat-text)

## parseArgs

[Node.js parseArgs Documentation](https://nodejs.org/docs/latest/api/all.html#all_util_utilparseargsconfig)

```ts
import { parseArgs } from "node:util";

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
```

## Dirname

`console.log(import.meta.dirname);`

## Glob

```ts
for await (const file of glob(import.meta.dirname + "/*")) {
  console.log(styleText("red", file));
}
```

## createReadStream

```ts
import { glob } from "node:fs/promises";
import { createReadStream } from "node:fs";

for await (const file of glob(import.meta.dirname + "/*")) {
  console.log(styleText("red", file));
  if (file.endsWith("ts")) {
    const stream = createReadStream(file);

    for await (const chunk of stream) {
      console.log(styleText("green", chunk.toString().toUpperCase()));
    }
  }
}
```

## Test Runner

```ts
import { test } from "node:test";
import assert from "node:assert/strict";

test("NoJest", function () {
  const res = NoJest();
  assert.equal(res, "Hey no Jest needed!");
});
```
