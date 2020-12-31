import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { Controller, Post } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { CreateDTO } from '../dto/error';
import { validatorMiddleware } from '../middlewares/validator';
import { createSchema } from '../schemas/error';
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
}
