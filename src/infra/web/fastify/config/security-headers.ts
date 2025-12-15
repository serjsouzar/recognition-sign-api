import helmet from "@fastify/helmet";
import fastify, { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  fastify.register(helmet, { global: true });
};
