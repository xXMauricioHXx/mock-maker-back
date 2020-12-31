import { BaseController } from './controller';
import { AppContainer } from '../../container';
import { RuleService } from '../../container/services/rule';
import { Controller, Post } from '../decorators';
import { validatorMiddleware } from '../middlewares/validator';
import { createSchema } from '../schemas/rule';
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
}
