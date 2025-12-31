import { FastifyInstance } from "fastify";

import { isInProductionMode } from "@/config/app";

import * as GestureSessionRouter from "./gesture-session.router";

export const configure = (fastify: FastifyInstance) => {
  fastify.get("/", function (request, reply) {
    if (isInProductionMode()) {
      return reply.send({
        name: "recognition-signs-api",
        version: "1.0.0",
      });
    } else {
      return reply.redirect("/docs");
    }
  });

  fastify.register(
    (instance, opts, done) => {
      GestureSessionRouter.configure(instance);

      done();
    },
    { prefix: "v1" }
  );
};
