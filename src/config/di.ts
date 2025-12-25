import { GestureSessionTypeORMRepository } from "@/infra/database/typeorm/recognition_sign_db/repositories/gesture-session-typeorm.repository";
import { Log } from "@/infra/logger/log";
import Container from "typedi";

export const configure = () => {
  Container.set(
    "GestureSessionDomainInterfaceRepository",
    new GestureSessionTypeORMRepository()
  );

  Log.info("[DI] Ready");
};
