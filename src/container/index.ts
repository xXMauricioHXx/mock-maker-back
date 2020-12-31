import knex from 'knex';
import { Container } from 'injection';
import { env } from '../env';
import { ProjectRepository } from './repositories/project';
import { ProjectService } from './services/project';
import { RouteRepository } from './repositories/route';
import { RouteService } from './services/route';
import { RuleService } from './services/rule';
import { RuleRepository } from './repositories/rule';
import { ErrorService } from './services/error';
import { ErrorRepository } from './repositories/error';
import { RouteErrorRepository } from './repositories/route-error';
import { RouteErrorService } from './services/route-error';

export class AppContainer extends Container {
  constructor() {
    super();
    this.loadProviders().forEach(provider => this.bind(provider));

    const configs = this.loadConfigs();
    for (const key in configs) {
      if (key) {
        this.registerObject(key, configs[key]);
      }
    }
  }

  protected loadProviders(): Function[] {
    return [
      ProjectRepository,
      ProjectService,
      RouteRepository,
      RouteService,
      RuleService,
      RuleRepository,
      ErrorService,
      ErrorRepository,
      RouteErrorRepository,
      RouteErrorService,
    ];
  }

  loadConfigs(): any {
    return {
      mysqlDatabase: knex(env.knexConfig),
    };
  }
}
