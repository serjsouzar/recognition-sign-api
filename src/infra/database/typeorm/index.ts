import { Log } from "../../logger/log";
import { gestureService } from "./recognition_sign_db/connection";

export const connect = async () => {
  try {
    Log.info("[DATABASE] Connecting...");

    await Promise.all([gestureService.initialize()]);

    Log.info("[DATABASE] Connected.");
  } catch (error) {
    Log.error("[DATABASE] Connection error.", error);

    throw error;
  }
};
