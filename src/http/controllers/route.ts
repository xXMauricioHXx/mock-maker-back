import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { Controller, Post, Get, Delete, Put } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { CreateDTO } from '../dto/route';
import { validatorMiddleware } from '../middlewares/validator';
import {
  createSchema,
  listAllSchema,
  deleteSchema,
  updateSchema,
  listByIdSchema,
} from '../schemas/route';
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

  @Get('/', [validatorMiddleware(listAllSchema)])
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.query as any;
      const route = await this.routeService.listAll(projectId);
      res.send(route);
    } catch (err) {
      next(err);
    }
  }

  @Get('/:id', [validatorMiddleware(listByIdSchema)])
  async listById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const route = await this.routeService.listById(id);
      res.send(route);
    } catch (err) {
      next(err);
    }
  }

  @Delete('/:id', [validatorMiddleware(deleteSchema)])
  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.routeService.deleteById(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  @Put('/:id', [validatorMiddleware(updateSchema)])
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.routeService.updateById(id, req.body);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
