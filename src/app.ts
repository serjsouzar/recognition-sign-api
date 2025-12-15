import * as Config from "./config";
import * as HttpServer from "./infra/web/fastify";
import * as Database from "./infra/database/typeorm";
import { Log } from "./infra/logger/log";

(async () => {
  try {
    Log.info("[APP] Starting...");

    await Config.start();
    await Database.connect();
    await HttpServer.start();
  } catch (error) {
    Log.error("[APP] Failed when trying to start the application", error);
  }
})();
