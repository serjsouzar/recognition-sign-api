import "reflect-metadata";
import "dotenv/config";

import Fastify from "fastify";
import qs from "qs";

import * as Router from "./routes";
import * as DI from "@/config/di";
import * as Cors from "./config/cors";
import * as Schema from "./config/schema";
import * as Swagger from "./config/swagger";
import * as SecurityHeaders from "./config/security-headers";

import { Log } from "@/infra/logger/log";
import { ENVIRONMENT, PORT } from "@/config/env";

export const start = async () => {
  const fastify = Fastify({
    routerOptions: {
      querystringParser: (str) => qs.parse(str),
    },
  });

  DI.configure();
  await SecurityHeaders.register(fastify);

  await Cors.register(fastify);

  Schema.configure(fastify);

  await Swagger.configure(fastify);

  Router.configure(fastify);

  fastify.listen({ port: PORT }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    Log.info(
      `[SERVER] Server started on port ${PORT}. Environment: ${ENVIRONMENT} 👾`
    );
  });
};
