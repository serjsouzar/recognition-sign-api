import { GestureSessionDomainEntity } from "@/domain/gesture-session/entities/gesture-session.domain.entity";
import { GestureSessionTypeOrmEntity } from "../entities/gesture-session.typeorm.entity";

export class GestureSessionMapper {
  static toEntity(
    session: GestureSessionTypeOrmEntity
  ): GestureSessionDomainEntity {
    return GestureSessionDomainEntity.restore({
      id: session.id,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      status: session.status,
      userIp: session.userIp,
    });
  }
}
