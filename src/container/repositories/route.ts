import { provide } from 'injection';
import { Repository } from './repository';
import { Route } from '../../types';
import { Transaction } from 'knex';

@provide()
export class RouteRepository extends Repository<Route> {
  getTableName(): string {
    return 'route';
  }

  getByProjectId(projectId: string, trx?: Transaction): Promise<Route[]> {
    return this.transactionable(trx).where('projectId', projectId);
  }
}
