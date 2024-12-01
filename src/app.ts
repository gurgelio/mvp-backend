import AutoLoad from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import closeWithGrace from "close-with-grace";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import * as path from "path";
import { fileURLToPath } from "url";
import { ZodError } from "zod";
import { env } from "./env.js";
import { prisma } from "./lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const app = createServer();

closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) app.log.error(err);

  await app.close();
});

app.listen({ port: 3000 }).catch((err: unknown) => {
  app.log.error(err);
  process.exit(1);
});

export function createServer() {
  const app = fastify({
    logger: envToLogger[env.ENV],
  });

  app.register(fastifySensible);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // This loads all plugins defined in routes
  // define your routes in one of these
  void app.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    forceESM: true,
  });

  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) return reply.notFound();
  });

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return app.withTypeProvider<ZodTypeProvider>();
}

export type App = ReturnType<typeof createServer>;
