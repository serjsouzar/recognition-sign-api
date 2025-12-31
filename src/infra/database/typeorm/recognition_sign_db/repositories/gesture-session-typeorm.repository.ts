import { Repository } from "typeorm";
import { GestureSessionTypeOrmEntity } from "../entities/gesture-session.typeorm.entity";
import { recognitionSignDb } from "../connection";
import { CreateSessionParams } from "@/domain/gesture-session/dtos/create-session-param";
import { GestureSessionMapper } from "../mappers/gesture-session.mapper";
import { DatabaseError } from "@/domain/shared/errors/database.error";
import { GestureSessionDomainEntity } from "@/domain/gesture-session/entities/gesture-session.domain.entity";
import { GestureSessionDomainInterfaceRepository } from "@/domain/gesture-session/repositories/gesture-session-domain.repository";

export class GestureSessionTypeORMRepository
  implements GestureSessionDomainInterfaceRepository
{
  private readonly repository: Repository<GestureSessionTypeOrmEntity>;

  constructor() {
    this.repository = recognitionSignDb.getRepository(
      GestureSessionTypeOrmEntity
    );
  }

  async createAndStartSession(
    params: CreateSessionParams
  ): Promise<GestureSessionDomainEntity> {
    try {
      const sessionInstance = this.repository.create({
        startedAt: params.startedAt,
        status: params.status,
        userIp: params.userIp,
      });

      const createdSession = await this.repository.save(sessionInstance);

      return GestureSessionMapper.toEntity(createdSession);
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseError("Falha ao tentar criar sessão", error);
    }
  }

  async findSessionByIp(
    userIp: string | any
  ): Promise<GestureSessionDomainEntity | null> {
    try {
      const session = await this.repository.findOne({
        where: {
          userIp,
        },
      });
      return GestureSessionMapper.toEntity(session!);
    } catch (e) {
      return null;
    }
  }

  async startExistingSession(params: CreateSessionParams): Promise<void> {
    try {
      await this.repository.update(
        { userIp: params.userIp },
        { startedAt: params.startedAt, status: true }
      );
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseError("Falha ao atualizar sessão existente", error);
    }
  }
}
