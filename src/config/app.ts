import { ENVIRONMENT } from "./env";

export const isInProductionMode = (): boolean => {
  return ENVIRONMENT === "production";
};
