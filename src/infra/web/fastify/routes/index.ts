import { FastifyInstance } from "fastify";

import { isInProductionMode } from "@/config/app";

export const configure = (fastify: FastifyInstance) => {
  fastify.get("/", function (request, reply) {
    if (isInProductionMode()) {
      return reply.send({
        name: "template-projeto-api",
        version: "1.0.0",
      });
    } else {
      return reply.redirect("/docs");
    }
  });

  fastify.register(
    (instance, opts, done) => {
      // AuthRouter.configure(instance);

      done();
    },
    { prefix: "v1" }
  );
};
