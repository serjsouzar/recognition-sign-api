import { Log } from "../../logger/log";
import { recognitionSignDb } from "./recognition_sign_db/connection";

export const connect = async () => {
  try {
    Log.info("[DATABASE] Connecting...");

    await Promise.all([recognitionSignDb.initialize()]);

    Log.info("[DATABASE] Connected.");
  } catch (error) {
    Log.error("[DATABASE] Connection error.", error);

    throw error;
  }
};
