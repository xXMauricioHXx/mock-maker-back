import { validateOrReject, ValidationError } from 'class-validator';
import { env } from './env';
import { HttpServer } from './http';
import { AppContainer } from './container';
import { logger } from './logger';

export class Application {
  protected readonly bashFlag = '--bash';

  protected httpServer?: HttpServer;

  async start(): Promise<void> {
    try {
      await validateOrReject(env);

      const container = new AppContainer();

      this.httpServer = new HttpServer(container, {
        port: env.httpPort,
        bodyLimit: env.httpBodyLimit,
      });
      this.httpServer.start();
      logger.info(`Http server started in port ${this.httpServer.port}`);
    } catch (err) {
      if (err.length && err[0] instanceof ValidationError) {
        this.throwEnvValidatorErrors(err);
      }
      throw err;
    }
  }

  private throwEnvValidatorErrors(err: ValidationError[]) {
    err.forEach((item: ValidationError) => {
      for (const key in item.constraints) {
        if (key) {
          const message = item.constraints[key];
          throw new Error(message);
        }
      }
    });
  }
}
