import { provide } from 'injection';
import { Repository } from './repository';
import { Error } from '../../types';
import { Transaction } from 'knex';

@provide()
export class ErrorRepository extends Repository<Error> {
  getTableName(): string {
    return 'error';
  }

  listErrorsByRouteId(
    routeId: string,
    trx?: Transaction
  ): Promise<Error[] | null> {
    return this.transactionable(trx)
      .innerJoin('error_route', 'error_route.errorId', 'error.id')
      .where('error_route.routeId', routeId);
  }
}
