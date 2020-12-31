import { provide } from 'injection';
import { Repository } from './repository';
import { Error } from '../../types';

@provide()
export class ErrorRepository extends Repository<Error> {
  getTableName(): string {
    return 'error';
  }
}
