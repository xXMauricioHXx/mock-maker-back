import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { Controller, Post, Get, Delete, Put } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { CreateDTO } from '../dto/error';
import { validatorMiddleware } from '../middlewares/validator';
import {
  createSchema,
  listByIdSchema,
  deleteSchema,
  updateSchema,
  listAllSchema,
} from '../schemas/error';
import { ErrorService } from '../../container/services/error';

@Controller('/error')
export class ErrorController extends BaseController {
  protected errorService: ErrorService;
  constructor(container: AppContainer) {
    super();
    this.errorService = container.get<ErrorService>(ErrorService);
  }

  @Post('/', [validatorMiddleware(createSchema)])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateDTO = req.body;
      const error = await this.errorService.create(data);
      res.status(201).send(error);
    } catch (err) {
      next(err);
    }
  }

  @Get('/', [validatorMiddleware(listAllSchema)])
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const routeId = req.query.routeId as string;
      const errors = await this.errorService.listAll(routeId);
      res.send(errors);
    } catch (err) {
      next(err);
    }
  }

  @Get('/:id', [validatorMiddleware(listByIdSchema)])
  async listById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const error = await this.errorService.listById(id);
      res.send(error);
    } catch (err) {
      next(err);
    }
  }

  @Delete('/:id', [validatorMiddleware(deleteSchema)])
  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.errorService.deleteById(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  @Put('/:id', [validatorMiddleware(updateSchema)])
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.errorService.updateById(id, req.body);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
