export class Log {
  static info(message: string) {
    console.info(`[${new Date().toISOString()}] ${message}`);
  }

  static error(message: string, error?: unknown) {
    console.error(`[${new Date().toISOString()}] ${message}`, error);
  }
}
