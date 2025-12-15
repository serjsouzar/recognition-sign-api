import path from "node:path";
import fs from "node:fs/promises";

export const ROOT_DIR = path.resolve();

export const STORAGE_FOLDER = path.resolve(ROOT_DIR, "storage");

export const RESOURCE_FOLDER = path.resolve(ROOT_DIR, "resources");

export const createFoldersIfNotExists = async () => {
  const folders = [STORAGE_FOLDER];

  for (const folder of folders) {
    try {
      await fs.access(folder, fs.constants.F_OK);
    } catch (error) {
      fs.mkdir(folder, { recursive: true });
    }
  }
};
