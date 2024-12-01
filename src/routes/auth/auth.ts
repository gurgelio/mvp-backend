import { z } from "zod";
import type { App } from "../../app.js";
import { digest } from "../../lib/hash.js";
import { prisma } from "../../lib/prisma.js";

const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function (app: App) {
  app.post(
    "/login",
    {
      schema: { body: authSchema },
    },
    async (request, reply) => {
      const admin = await prisma.admin.findUnique({
        where: {
          email: request.body.email,
          password: digest(request.body.password),
        },
      });
      if (admin == null)
        return await reply.notFound("Usuário ou senha incorretos.");
    },
  );

  app.post(
    "/signup",
    {
      schema: { body: authSchema },
    },
    async (request, reply) => {
      await prisma.admin
        .create({
          data: {
            email: request.body.email,
            password: digest(request.body.password),
          },
        })
        .catch((err: unknown) => {
          request.log.error(err);
          reply.internalServerError();
        })
        .finally(() => {
          reply.status(204).send();
        });
    },
  );
}
