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
    //Pensar se existe alguma logica a ser implementada para o usecase de sessão
    // const a = this.repository.createAndStartSession({
    // })
  }
}
