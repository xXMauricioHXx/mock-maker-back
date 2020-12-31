import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { Controller, Post } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { CreateDTO } from '../dto/route';
import { validatorMiddleware } from '../middlewares/validator';
import { createSchema } from '../schemas/route';
import { RouteService } from '../../container/services/route';

@Controller('/route')
export class RouteController extends BaseController {
  protected routeService: RouteService;
  constructor(container: AppContainer) {
    super();
    this.routeService = container.get<RouteService>(RouteService);
  }

  @Post('/', [validatorMiddleware(createSchema)])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateDTO = req.body;

      const route = await this.routeService.create(data);
      res.status(201).send(route);
    } catch (err) {
      next(err);
    }
  }
}
