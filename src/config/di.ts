import { Log } from "@/infra/logger/log";

export const configure = () => {
  // Container.set("PassportInterfaceRepository", new PassportAxiosRepository());

  Log.info("[DI] Ready");
};
