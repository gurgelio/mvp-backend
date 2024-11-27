import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { FastifyPluginCallback } from "fastify";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginCallback<AppOptions> = (fastify, opts) => {
  fastify.register(fastifySensible);

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });
};

export default app;
export { app, options };
