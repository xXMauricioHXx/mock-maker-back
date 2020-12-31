import { inject, provide } from 'injection';
import { RuleRepository } from '../repositories/rule';
import { CreateDTO } from '../../http/dto/rule';
import { Rule } from '../../types';

@provide()
export class RuleService {
  constructor(@inject() protected readonly ruleRepository: RuleRepository) {}

  async create(data: CreateDTO): Promise<Rule | null> {
    const { rule } = data;
    const ruleId = await this.ruleRepository.create({
      ...data,
      rule: JSON.stringify(rule),
    });
    return this.ruleRepository.getById(ruleId);
  }
}
