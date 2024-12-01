import { rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { TestContext } from "node:test";
import { fileURLToPath } from "node:url";
import { app } from "../src/app.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Automatically build and tear down our instance
function build(t: TestContext) {
  // Tear down our app after we are done
  t.after(() => {
    void app.close();
    void rm(join(__dirname, "../prisma/test.db"));
  });

  return app;
}

export { build };
