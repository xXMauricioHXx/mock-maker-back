import { provide, inject } from 'injection';
import { CreateDTO } from '../../http/dto/route';
import { RouteRepository } from '../repositories/route';
import { Route } from '../../types';
import { RouteAlreadyExistsError } from '../../errors';
import { RoutesErrorCode } from '../../enums';

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
      if (err.code === RoutesErrorCode.AlreadyExist) {
        throw new RouteAlreadyExistsError();
      }

      throw err;
    }
  }

  listAll(projectId?: string): Promise<Route[]> {
    if (projectId) {
      return this.routeRepository.getByProjectId(projectId);
    }
    return this.routeRepository.all();
  }

  listById(id: string): Promise<Route | null> {
    return this.routeRepository.getById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.routeRepository.deleteById(id);
  }

  async updateById(id: string, data: Partial<Route>): Promise<void> {
    let completedData: any = data;

    if (data.response) {
      completedData = {
        ...completedData,
        response: JSON.stringify(data.response),
      };
    }
    await this.routeRepository.updateById(id, completedData);
  }
}
