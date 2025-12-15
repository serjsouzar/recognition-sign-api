import axios, { AxiosResponse } from "axios";
import {
  APP_ID,
  PASSPORT_URL,
  PASSPORT_APPLICATION_CLIENT_ID,
  PASSPORT_APPLICATION_CLIENT_SECRET,
  PASSPORT_PERSONAL_CLIENT_ID,
  PASSPORT_PERSONAL_CLIENT_SECRET,
  RESET_PASSWORD_EMAIL_URL,
} from "@/config/env";
import { passportClient } from "@/config/apis/passport-service";
import { Service } from "typedi";
import { PassportInterfaceRepository } from "@/domain/auth/repositories/passport.repository";
import { AuthenticateParams } from "@/domain/auth/dtos/authenticate-params";
import { Authorization } from "@/domain/shared/interfaces/passport-service/authorization";
import { ApiAuthorization } from "./interface/api-authorization";
import { fromApiAuthorization } from "./mappers/authorization.mapper";
import { UnauthenticatedError } from "@/domain/shared/errors/unauthenticated.error";
import { HttpError } from "@/domain/shared/errors/http.error";
import { GetPermissionsParams } from "@/domain/auth/dtos/get-permissions-params";
import { Permission } from "@/domain/shared/enums/permission";
import { MeParams } from "@/domain/auth/dtos/me-params";
import { User } from "@/domain/shared/interfaces/passport-service/user";
import { fromApiUser } from "./mappers/user.mapper";
import { ApiUser } from "./interface/api-user";
import { RevokeParams } from "@/domain/auth/dtos/revoke-params";
import { ForgotPasswordParams } from "@/domain/auth/dtos/forgot-password-params";
import { ClientTokenHelper } from "@/infra/helpers/client-token.helper";
import { ClientAuthorization } from "@/domain/shared/interfaces/passport-service/client-authorization";
import { ApiClientAuthorization } from "./interface/api-client-authorization";
import { fromApiClientAuthorization } from "./mappers/client-authorization.mapper";

@Service()
export class PassportAxiosRepository implements PassportInterfaceRepository {
  async authenticate({
    username,
    password,
  }: AuthenticateParams): Promise<Authorization> {
    try {
      const { data } = await passportClient.post<ApiAuthorization>(
        "/oauth/token",
        {
          username,
          password,
          client_id: PASSPORT_PERSONAL_CLIENT_ID,
          client_secret: PASSPORT_PERSONAL_CLIENT_SECRET,
          scope: "",
          grant_type: "password",
        }
      );

      return fromApiAuthorization(data);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError("Email e/ou senha incorreto");
      }

      throw new HttpError(
        "Falha ao tentar realizar a autenticação",
        status,
        error
      );
    }
  }

  async getPermissions({ token }: GetPermissionsParams): Promise<Permission[]> {
    try {
      const response = await passportClient.get<Permission[]>(
        "/api/self/permissions",
        {
          params: {
            application_id: APP_ID,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError();
      }

      throw new HttpError("Falha ao tentar obter as permissões", status, error);
    }
  }

  async me({ token }: MeParams): Promise<User> {
    try {
      const { data } = await passportClient.get<ApiUser>("/api/self", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-application-id": APP_ID,
        },
      });

      return fromApiUser(data);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError();
      }

      throw new HttpError(
        "Falha ao tentar buscar os dados do usuário",
        status,
        error
      );
    }
  }

  async revoke({ token }: RevokeParams): Promise<void> {
    try {
      await passportClient.delete("/api/oauth/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError();
      }

      throw new HttpError("Falha ao tentar revogar o token", status, error);
    }
  }

  async forgotPassword({ email }: ForgotPasswordParams): Promise<void> {
    try {
      const { accessToken, tokenType } =
        await ClientTokenHelper.getClientAuthorization();

      const options = {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      };

      const body = {
        email,
        redirect_url: RESET_PASSWORD_EMAIL_URL,
      };

      await passportClient.post("/api/password/reset/create", body, options);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError();
      }

      throw new HttpError(
        "Falha ao tentar solicitar a troca de senha",
        status,
        error
      );
    }
  }

  async authenticateApp(): Promise<ClientAuthorization> {
    try {
      const { data } = await passportClient.post<ApiClientAuthorization>(
        "/oauth/token",
        {
          client_id: PASSPORT_APPLICATION_CLIENT_ID,
          client_secret: PASSPORT_APPLICATION_CLIENT_SECRET,
          grant_type: "client_credentials",
        }
      );

      return fromApiClientAuthorization(data);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error.response?.status || 500;

      if (status === 401) {
        throw new UnauthenticatedError();
      }

      throw new HttpError(
        "Falha ao tentar realizar a autenticação da api",
        status,
        error
      );
    }
  }
}
