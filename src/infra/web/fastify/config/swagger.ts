import swagger from "@fastify/swagger";
import { Log } from "@/infra/logger/log";
import { FastifyInstance } from "fastify";
import swaggerUi from "@fastify/swagger-ui";
import { isInProductionMode } from "@/config/app";

export const configure = async (fastify: FastifyInstance) => {
  if (isInProductionMode()) {
    return;
  }

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Template de projeto backend",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "docs",
  });

  Log.info("[SWAGGER] Ready");
};
