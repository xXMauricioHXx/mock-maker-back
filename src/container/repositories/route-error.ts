import { provide } from 'injection';
import { Repository } from './repository';
import { RouteError } from '../../types';
import { Transaction } from 'knex';

@provide()
export class RouteErrorRepository extends Repository<RouteError> {
  getTableName(): string {
    return 'route_error';
  }

  async getByRouteId(
    routeId: string,
    trx?: Transaction
  ): Promise<RouteError[]> {
    return this.transactionable(trx).where('routeId', routeId);
  }
}
