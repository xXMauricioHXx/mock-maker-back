import { provide } from 'injection';
import { Repository } from './repository';
import { Project } from '../../types';
import { Transaction } from 'knex';

@provide()
export class ProjectRepository extends Repository<Project> {
  getTableName(): string {
    return 'project';
  }

  getByName(name: string, trx?: Transaction): Promise<Project | null> {
    return this.transactionable(trx)
      .where('name', name)
      .first();
  }
}
