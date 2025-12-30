import { GestureSessionTypeORMRepository } from "@/infra/database/typeorm/recognition_sign_db/repositories/gesture-session-typeorm.repository";
import { CreateSessionParams } from "../dtos/create-session-param";
import { GestureSessionDomainInterfaceRepository } from "../repositories/gesture-session-domain.repository";
import Container, { Service } from "typedi";

@Service()
export class GestureSessionUseCase {
  private readonly repository: GestureSessionDomainInterfaceRepository;

  constructor() {
    this.repository = Container.get("GestureSessionDomainInterfaceRepository");
  }

  async execute(params: CreateSessionParams) {
    const session = await this.repository.findSessionByIp(params.userIp);

    if (session) {
      await this.repository.startExistingSession(params);
    } else {
      await this.repository.createAndStartSession(params);
    }
  }
}
