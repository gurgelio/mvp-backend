// This file contains code that we reuse between our tests.
import helper from "fastify-cli/helper.js";
import type { FastifyInstance } from "fastify/types/instance.js";
import type * as test from "node:test";
import * as path from "path";
import { fileURLToPath } from "url";

export interface TestContext {
  after: typeof test.after;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AppPath = path.join(__dirname, "..", "src", "app.ts");

// Automatically build and tear down our instance
function build(t: TestContext) {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath];

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = helper.build(argv, {}) as FastifyInstance;

  // Tear down our app after we are done
  t.after(() => void app.close());

  return app;
}

export { build };
