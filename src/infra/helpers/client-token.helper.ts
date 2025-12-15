import * as fs from "fs/promises";
import * as path from "path";
import Container from "typedi";
import { addSeconds, isBefore } from "date-fns";
import { AppAuthorization } from "@/domain/shared/interfaces/passport-service/app-authorization";
import { PassportInterfaceRepository } from "@/domain/auth/repositories/passport.repository";
import { STORAGE_FOLDER } from "@/config/path";

export class ClientTokenHelper {
  private static readonly folder = STORAGE_FOLDER;
  private static readonly fileName = "client_authorization.json";

  static async getClientAuthorization() {
    await ClientTokenHelper.createFolderIfNotExits();
    let authorization = await ClientTokenHelper.tryGetFileAuthorization();

    if (!authorization || !ClientTokenHelper.tokenIsValid(authorization)) {
      authorization = await this.createAppAuthorization();
    }

    return authorization;
  }

  private static async createFolderIfNotExits() {
    try {
      await fs.access(ClientTokenHelper.folder);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        fs.mkdir(ClientTokenHelper.folder);
      }
    }
  }

  private static async tryGetFileAuthorization(): Promise<AppAuthorization | null> {
    const filePath = path.resolve(
      ClientTokenHelper.folder,
      ClientTokenHelper.fileName
    );

    try {
      const content = (await fs.readFile(filePath)).toString();

      if (content === "") {
        return null;
      }

      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  private static tokenIsValid(authorization: AppAuthorization): boolean {
    return (
      Boolean(authorization.expiresAt) &&
      isBefore(new Date(), new Date(authorization.expiresAt))
    );
  }

  private static async createAppAuthorization(): Promise<AppAuthorization> {
    const filePath = path.resolve(
      ClientTokenHelper.folder,
      ClientTokenHelper.fileName
    );
    const passportRepository = Container.get<PassportInterfaceRepository>(
      "PassportInterfaceRepository"
    );
    const authorization = await passportRepository.authenticateApp();
    const expiresAt = addSeconds(new Date(), authorization.expiresIn);

    const data = {
      ...authorization,
      expiresAt: expiresAt.toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return data;
  }
}
