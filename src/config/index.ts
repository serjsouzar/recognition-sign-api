import { Log } from "@/infra/logger/log";
import { createFoldersIfNotExists } from "./path";

export const start = async () => {
  await createFoldersIfNotExists();

  Log.info("[CONFIG] Ready");
};
