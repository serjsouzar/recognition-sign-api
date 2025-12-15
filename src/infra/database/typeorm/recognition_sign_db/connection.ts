import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";
import {
  GESTURE_SERVICE_HOST,
  GESTURE_SERVICE_USERNAME,
  GESTURE_SERVICE_PASSWORD,
  GESTURE_SERVICE_DATABASE,
  GESTURE_SERVICE_PORT,
  GESTURE_SERVICE_DEBUG,
} from "../../../../config/env";

export const gestureService = new DataSource({
  type: "postgres",
  host: GESTURE_SERVICE_HOST,
  port: GESTURE_SERVICE_PORT,
  username: GESTURE_SERVICE_USERNAME,
  password: GESTURE_SERVICE_PASSWORD,
  database: GESTURE_SERVICE_DATABASE,
  logging: GESTURE_SERVICE_DEBUG,
  entities: [path.resolve(__dirname, "entities", "*{.js,.ts}")],
  migrations: [path.resolve(__dirname, "migrations", "*{.js,.ts}")],
});
