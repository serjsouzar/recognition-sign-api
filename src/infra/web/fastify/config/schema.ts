import S from "fluent-json-schema";
import { Log } from "@/infra/logger/log";
import { FastifyInstance } from "fastify";

export const configure = (fastify: FastifyInstance) => {
  const unprocessableEntityResponse = S.object()
    .id("UnprocessableEntity")
    .prop("message", S.string())
    .prop("errors", S.array().items(S.string()))
    .description("Erro de validação.");

  const businessErrorResponse = S.object()
    .id("BusinessError")
    .prop("message", S.string())
    .prop(
      "internalErrorCode",
      S.number().enum([1]).description("1 - Username already registered")
    );

  const forbiddenResponse = S.object()
    .id("Forbidden")
    .prop("message", S.string());

  const notFoundErrorResponse = S.object()
    .id("NotFound")
    .prop("message", S.string());

  const unauthorizedErrorResponse = S.object()
    .id("Unauthorized")
    .prop("message", S.string());

  const tooManyRequestsErrorResponse = S.object()
    .id("TooManyRequests")
    .prop("message", S.string());

  const errorResponse = S.object()
    .id("ServerError")
    .prop("message", S.string());

  const customer = S.object()
    .id("Customer")
    .prop("id", S.number())
    .prop("monuvId", S.oneOf([S.number(), S.null()]))
    .prop("name", S.string())
    .prop("createdAt", S.string().format("date-time"))
    .prop("updatedAt", S.string().format("date-time"))
    .prop("similarity", S.number());

  const passportUser = S.object()
    .id("PassportUser")
    .prop("id", S.number())
    .prop("externalId", S.number().raw({ nullable: true }))
    .prop("customerId", S.number())
    .prop("name", S.string())
    .prop("email", S.string())
    .prop("address", S.string())
    .prop("username", S.string())
    .prop("usesClientIntegration", S.boolean())
    .prop("createdAt", S.string())
    .prop("updatedAt", S.string())
    .prop("deletedAt", S.string().raw({ nullable: true }))
    .prop(
      "customer",
      S.object()
        .prop("id", S.number())
        .prop("cnpj", S.string())
        .prop("address", S.string())
        .prop("name", S.string())
        .prop("integrationId", S.string())
        .prop("createdAt", S.string())
        .prop("updatedAt", S.string())
        .prop("deletedAt", S.string().raw({ nullable: true }))
        .prop(
          "images",
          S.object()
            .prop(
              "logo",
              S.object().prop("normal", S.string()).prop("small", S.string())
            )
            .prop("background", S.string())
        )
        .prop("parentId", S.number().raw({ nullable: true }))
        .prop("child", S.array())
        .prop("poc", S.boolean())
        .prop("expirationDate", S.string())
    )
    .prop(
      "units",
      S.array().items(
        S.object()
          .prop("id", S.number())
          .prop("customerId", S.number())
          .prop("unitName", S.string())
          .prop("cnpj", S.string())
          .prop("address", S.string())
          .prop("parentId", S.number())
          .prop("createdAt", S.string())
          .prop("updatedAt", S.string())
          .prop("deletedAt", S.string().raw({ nullable: true }))
          .prop("areaId", S.number())
          .prop("areaId", S.number())
          .prop("number", S.string())
          .prop("complement", S.string())
          .prop("stateId", S.number())
          .prop("cityId", S.number())
          .prop("neighborhoodId", S.number())
          .prop("externalSystemCode", S.string())
          .prop(
            "pivot",
            S.object()
              .prop("userId", S.number())
              .prop("customerUnitId", S.number())
          )
          .prop("evasionPoints", S.array())
      )
    )
    .prop(
      "userGroups",
      S.array().items(
        S.object()
          .prop("id", S.number())
          .prop("customerId", S.number())
          .prop("groupName", S.string())
          .prop("createdAt", S.string())
          .prop("updatedAt", S.string())
          .prop("deletedAt", S.string().raw({ nullable: true }))
          .prop(
            "pivot",
            S.object().prop("usersId", S.number()).prop("groupsId", S.number())
          )
          .prop(
            "mediaGroups",
            S.array().items(
              S.object()
                .prop("groupId", S.number())
                .prop("mediaGroupId", S.number())
            )
          )
      )
    );

  const user = S.object()
    .id("User")
    .prop("id", S.number())
    .prop("customerId", S.number())
    .prop("name", S.string())
    .prop("email", S.string())
    .prop("createdAt", S.string())
    .prop("updatedAt", S.string())
    .prop("deletedAt", S.oneOf([S.string().format("date-time"), S.null()]));

  const schemas = [
    customer,
    passportUser,
    user,
    unprocessableEntityResponse,
    businessErrorResponse,
    forbiddenResponse,
    notFoundErrorResponse,
    unauthorizedErrorResponse,
    tooManyRequestsErrorResponse,
    errorResponse,
  ];

  schemas.forEach((schema) => fastify.addSchema(schema));

  Log.info("[SCHEMA] Ready");
};
