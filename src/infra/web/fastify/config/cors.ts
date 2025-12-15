import cors from "@fastify/cors";
import fastify, { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(cors);
};
