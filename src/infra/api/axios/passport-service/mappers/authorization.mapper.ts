import { Authorization } from "@/domain/shared/interfaces/passport-service/authorization";
import { ApiAuthorization } from "../interface/api-authorization";

export const fromApiAuthorization = (
  passportAuthorization: ApiAuthorization
): Authorization => {
  return {
    accessToken: passportAuthorization.access_token,
    refreshToken: passportAuthorization.refresh_token,
    expiresIn: passportAuthorization.expires_in,
    tokenType: passportAuthorization.token_type,
  };
};
