import { provide, inject } from 'injection';
import { CreateDTO } from '../../http/dto/route';
import { RouteRepository } from '../repositories/route';
import { Route } from '../../types';

@provide()
export class RouteService {
  constructor(@inject() protected readonly routeRepository: RouteRepository) {}

  async create(data: CreateDTO): Promise<Route | null> {
    const { response } = data;

    const routeId = await this.routeRepository.create({
      ...data,
      response: JSON.stringify(response),
    });

    return await this.routeRepository.getById(routeId);
  }

  listAll(projectId?: string): Promise<Route[]> {
    if (projectId) {
      return this.routeRepository.getByProjectId(projectId);
    }
    return this.routeRepository.all();
  }

  async deleteById(id: string): Promise<void> {
    await this.routeRepository.deleteById(id);
  }
}
