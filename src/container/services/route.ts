import { provide, inject } from 'injection';
import { CreateDTO } from '../../http/dto/route';
import { RouteRepository } from '../repositories/route';
import { Route } from '../../types';

@provide()
export class RouteService {
  constructor(@inject() protected readonly routeRepository: RouteRepository) {}

  async create(data: CreateDTO): Promise<Route | null> {
    try {
      const { response } = data;

      const routeId = await this.routeRepository.create({
        ...data,
        response: JSON.stringify(response),
      });

      return await this.routeRepository.getById(routeId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
