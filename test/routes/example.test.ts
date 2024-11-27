import * as assert from "node:assert";
import { test } from "node:test";
import { build } from "../helper.js";

void test("example is loaded", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/example",
  });

  assert.equal(res.payload, "this is an example");
});
