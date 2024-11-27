import { FastifyPluginCallback } from "fastify";

const example: FastifyPluginCallback = (fastify) => {
  fastify.get("/", () => "this is an example");
};

export default example;
