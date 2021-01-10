import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { RuleService } from '../../container/services/rule';
import { Controller, Post, Get, Delete, Put } from '../decorators';
import { validatorMiddleware } from '../middlewares/validator';
import {
  createSchema,
  listByIdSchema,
  deleteSchema,
  updateSchema,
} from '../schemas/rule';
import { Request, Response, NextFunction } from 'express';

@Controller('/rule')
export class RuleController extends BaseController {
  protected ruleService: RuleService;

  constructor(container: AppContainer) {
    super();
    this.ruleService = container.get<RuleService>(RuleService);
  }

  @Post('/', [validatorMiddleware(createSchema)])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const rule = await this.ruleService.create(data);
      res.status(201).send(rule);
    } catch (err) {
      next(err);
    }
  }

  @Get('/')
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = await this.ruleService.listAll();
      res.send(errors);
    } catch (err) {
      next(err);
    }
  }

  @Get('/:id', [validatorMiddleware(listByIdSchema)])
  async listById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const error = await this.ruleService.listById(id);
      res.send(error);
    } catch (err) {
      next(err);
    }
  }

  @Delete('/:id', [validatorMiddleware(deleteSchema)])
  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.ruleService.deleteById(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  @Put('/:id', [validatorMiddleware(updateSchema)])
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.ruleService.updateById(id, req.body);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
