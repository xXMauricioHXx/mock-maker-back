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

  listAll(): Promise<Error[]> {
    return this.errorRepository.all();
  }

  listById(id: string): Promise<Error | null> {
    return this.errorRepository.getById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.errorRepository.deleteById(id);
  }

  async updateById(id: string, data: Partial<Error>): Promise<void> {
    await this.errorRepository.updateById(id, data);
  }
}
