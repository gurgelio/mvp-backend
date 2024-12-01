import autoLoad from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import closeWithGrace from "close-with-grace";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { ZodError } from "zod";
import { env } from "./env.js";
import { prisma } from "./lib/prisma.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

export const app = await createServer();
export type App = typeof app;

closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) app.log.error(err);

  await app.close();
});

async function createServer() {
  const app = fastify({
    logger: envToLogger[env.ENV],
  });

  app
    .register(fastifySensible)
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .setErrorHandler((error, _, reply) => {
      if (error instanceof ZodError) return reply.notFound();
    })
    .addHook("onClose", async () => prisma.$disconnect())
    .register(autoLoad, {
      dir: join(__dirname, "routes"),
    });

  await app.ready();
  return app.withTypeProvider<ZodTypeProvider>();
}
