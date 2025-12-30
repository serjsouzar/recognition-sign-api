import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const successResponse = "Sessão iniciada!";

export const gestureSessionSchema: FastifySchema = {
  tags: ["Areas"],
  querystring: S.object()
    .prop(
      "startedAt",
      S.string()
        .format("date-time")
        .raw({ nullable: false })
        .description("Data que a sessão esta sendo iniciada")
    )
    .prop("userIp", S.string().raw({ nullable: false }))
    .prop("status", S.boolean().raw({ nullable: false })),
  response: {
    200: successResponse,
    401: {
      $ref: "Unauthorized#",
    },
    422: {
      $ref: "UnprocessableEntity#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
