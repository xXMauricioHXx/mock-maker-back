import { provide, inject } from 'injection';
import { ProjectRepository } from '../repositories/project';
import { CreateDTO } from '../../http/dto/project';
import { Project } from '../../types';

@provide()
export class ProjectService {
  constructor(
    @inject() protected readonly projectRepository: ProjectRepository
  ) {}

  async create(data: CreateDTO): Promise<Project | null> {
    const projectId = await this.projectRepository.create(data);
    return await this.projectRepository.getById(projectId);
  }

  async listAll(): Promise<Project[]> {
    return this.projectRepository.all();
  }

  async deleteById(id: string): Promise<void> {
    await this.projectRepository.deleteById(id);
  }
}
