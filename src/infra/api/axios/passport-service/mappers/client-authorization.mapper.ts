import { ApiClientAuthorization } from "../interface/api-client-authorization";
import { ClientAuthorization } from "@/domain/shared/interfaces/passport-service/client-authorization";

export const fromApiClientAuthorization = (
  passportAuthorization: ApiClientAuthorization
): ClientAuthorization => {
  return {
    accessToken: passportAuthorization.access_token,
    expiresIn: passportAuthorization.expires_in,
    tokenType: passportAuthorization.token_type,
  };
};
