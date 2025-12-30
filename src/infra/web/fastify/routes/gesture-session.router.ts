import { FastifyInstance } from "fastify";
import Container from "typedi";
import { GestureSessionController } from "../controllers/recognition/gesture-session.controller";
import { gestureSessionSchema } from "./schemas/gesture-session/gesture-session.schema";

export const configure = (fastify: FastifyInstance) => {
  const gestureSessionController = Container.get(GestureSessionController);

  fastify.route({
    url: "/session",
    method: "get",
    // schema: gestureSessionSchema, <--- ajustar erro que esta ocorrendo ao tentar rodar o projeto com esse schema
    handler: gestureSessionController.execute,
  });
};
