import { provide, inject } from 'injection';
import { CreateDTO } from '../../http/dto/error';
import { Error } from '../../types';
import { ErrorRepository } from '../repositories/error';

@provide()
export class ErrorService {
  constructor(@inject() protected readonly errorRepository: ErrorRepository) {}

  async create(data: CreateDTO): Promise<Error | null> {
    const errorId = await this.errorRepository.create(data);
    return await this.errorRepository.getById(errorId);
  }
}
