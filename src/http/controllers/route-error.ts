import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { Controller, Post } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { CreateDTO } from '../dto/route-error';
import { validatorMiddleware } from '../middlewares/validator';
import { createSchema } from '../schemas/route-error';
import { RouteErrorService } from '../../container/services/route-error';

@Controller('/route-error')
export class RouteErrorController extends BaseController {
  protected routeErrorService: RouteErrorService;
  constructor(container: AppContainer) {
    super();
    this.routeErrorService = container.get<RouteErrorService>(
      RouteErrorService
    );
  }

  @Post('/', [validatorMiddleware(createSchema)])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateDTO = req.body;

      const route = await this.routeErrorService.create(data);
      res.status(201).send(route);
    } catch (err) {
      next(err);
    }
  }
}
