import { Repository } from './repository';
import { Rule } from '../../types';

export class RuleRepository extends Repository<Rule> {
  getTableName(): string {
    return 'rule';
  }
}
