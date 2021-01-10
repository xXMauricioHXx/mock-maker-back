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

  listAll(): Promise<Rule[]> {
    return this.ruleRepository.all();
  }

  listById(id: string): Promise<Rule | null> {
    return this.ruleRepository.getById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.ruleRepository.deleteById(id);
  }

  async updateById(id: string, data: Partial<Rule>): Promise<void> {
    const { rule } = data;
    await this.ruleRepository.updateById(id, {
      ...data,
      rule: JSON.stringify(rule),
    });
  }
}
