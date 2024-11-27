import type { FastifyPluginCallback } from "fastify";

const root: FastifyPluginCallback = (fastify) => {
  fastify.get("/", () => ({ root: true }));
};

export default root;
