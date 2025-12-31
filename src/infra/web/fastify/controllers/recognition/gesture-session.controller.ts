import { GestureSessionUseCase } from "@/domain/gesture-session/use-cases/gesture-session-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import Container, { Service } from "typedi";

@Service()
export class GestureSessionController {
  private readonly useCase: GestureSessionUseCase;

  constructor() {
    this.useCase = Container.get(GestureSessionUseCase);
  }

  execute = async (
    request: FastifyRequest<{
      Body: {
        startedAt: Date | string;
        userIp: string;
        status: boolean;
      };
    }>,
    reply: FastifyReply
  ) => {
    const { startedAt, userIp, status } = request.body;

    const response = await this.useCase.execute({
      startedAt,
      userIp,
      status: Boolean(status),
    });

    reply.status(200).send(response);
  };
}
