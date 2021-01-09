import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { AppContainer } from '../container';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import { NotFoundError } from '../errors';
import { BaseController } from './controllers/controller';
import { expressLogger } from '../logger';
import { ProjectController } from './controllers/project';
import { RouteController } from './controllers/route';
import { processor } from './middlewares/processor';
import { RuleController } from './controllers/rule';
import { ErrorController } from './controllers/error';
import { RouteErrorController } from './controllers/route-error';

export interface HttpRequest<
  Body = any,
  Query = any,
  Params = any,
  Cookies = any
> extends Express.Request {
  body: Body;
  cookies: Cookies;
  params: Params;
  query: Query;
}

export interface HttpServerConfig {
  port: number;
  bodyLimit: string;
}

export class HttpServer {
  protected app?: express.Application;

  protected container: AppContainer;

  protected config: HttpServerConfig;

  constructor(container: AppContainer, config: HttpServerConfig) {
    this.container = container;
    this.config = config;
  }

  get port(): number {
    return this.config.port;
  }

  getApp(): express.Application {
    if (!this.app) {
      throw new Error('Http server not started');
    }
    return this.app;
  }

  protected loadControllers(): BaseController[] {
    return [
      new ProjectController(this.container),
      new RouteController(this.container),
      new RuleController(this.container),
      new ErrorController(this.container),
      new RouteErrorController(this.container),
    ];
  }

  start(): void {
    if (this.app) {
      return;
    }

    /* Express initialization */
    const app = express();

    /* Express utilites */
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: this.config.bodyLimit,
      })
    );

    /* Status endpoint */
    app.get(
      ['/info', '/status'],
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }
    );

    this.loadControllers().forEach(controller => {
      if (!controller.routeConfigs) {
        return;
      }

      controller.routeConfigs.forEach(routeConfig => {
        const fullPath = [controller.path, routeConfig.path].join('');
        const jobs = [
          ...routeConfig.middlewares,
          routeConfig.func.bind(controller),
        ];

        switch (routeConfig.method) {
          case 'get':
            app.get(fullPath, jobs);
            break;
          case 'post':
            app.post(fullPath, jobs);
            break;
          case 'put':
            app.put(fullPath, jobs);
            break;
          case 'patch':
            app.patch(fullPath, jobs);
            break;
          case 'delete':
            app.delete(fullPath, jobs);
            break;
          default:
            break;
        }
      });
    });

    app.use(processor(this.container));

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );
    app.use(errorHandlerMiddleware);
    app.listen(this.config.port);

    this.app = app;
  }
}
