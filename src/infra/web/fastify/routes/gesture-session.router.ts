import { FastifyInstance } from "fastify";
import Container from "typedi";
import { GestureSessionController } from "../controllers/recognition/gesture-session.controller";
import { gestureSessionSchema } from "./schemas/gesture-session/gesture-session.schema";

export const configure = (fastify: FastifyInstance) => {
  const gestureSessionController = Container.get(GestureSessionController);

  fastify.route({
    url: "/session",
    method: "POST",
    schema: gestureSessionSchema,
    handler: gestureSessionController.execute,
  });
};
