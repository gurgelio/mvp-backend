import * as assert from "node:assert";
import { describe, test } from "node:test";
import { build } from "../helper.js";

describe("auth", () => {
  test("signup", async (t) => {
    const app = build(t);

    const res = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        email: "leo@gurgel.io",
        password: "SENHA SECRETA!!",
      },
    });

    assert.equal(res.statusCode, 204);
  });
});
