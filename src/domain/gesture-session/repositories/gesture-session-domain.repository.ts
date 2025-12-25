import { CreateSessionParams } from "../dtos/create-session-param";
import { GestureSessionDomainEntity } from "../entities/gesture-session.domain.entity";

export interface GestureSessionDomainInterfaceRepository {
  createAndStartSession: (
    params: CreateSessionParams
  ) => Promise<GestureSessionDomainEntity>;
}
