import { provide, inject } from 'injection';
import { CreateDTO } from '../../http/dto/route-error';
import { RouteError } from '../../types';
import { RouteErrorRepository } from '../repositories/route-error';

@provide()
export class RouteErrorService {
  constructor(
    @inject() protected readonly routeErrorRepository: RouteErrorRepository
  ) {}

  async create(data: CreateDTO): Promise<RouteError | null> {
    const routeErrorId = await this.routeErrorRepository.create(data);
    return await this.routeErrorRepository.getById(routeErrorId);
  }
}
