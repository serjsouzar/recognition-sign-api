import * as fs from "fs";
import * as path from "path";

export class Storage {
  static readonly driver = process.env.STORAGE_DRIVER;
  static readonly tmpFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "storage",
    "tmp"
  );
  static readonly downloadWithinServerFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "storage",
    "dws"
  );
  static readonly uploadsFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "storage",
    "uploads"
  );

  static init() {
    Storage.createUploadsFolderIfNotExists();
    Storage.createDwsFolderIfNotExists();
  }

  private static async createUploadsFolderIfNotExists() {
    try {
      await fs.promises.access(Storage.uploadsFolder);
    } catch (error) {
      await fs.promises.mkdir(Storage.uploadsFolder, { recursive: true });
    }
  }

  static async createDwsFolderIfNotExists() {
    try {
      await fs.promises.access(Storage.downloadWithinServerFolder);
    } catch (error) {
      await fs.promises.mkdir(Storage.downloadWithinServerFolder, {
        recursive: true,
      });
    }
  }
}
