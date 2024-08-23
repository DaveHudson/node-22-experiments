import { test } from "node:test";
import assert from "node:assert/strict";

import { NoJest } from "./no-jest";

test("NoJest", function () {
  const res = NoJest();
  assert.equal(res, "Hey no Jest needed!");
});
