import "fastify";
import { Auth } from "./domain/auth/service/auth";

declare module "fastify" {
  interface FastifyRequest {
    auth?: Auth;
    clientToken?: string;
  }
}
