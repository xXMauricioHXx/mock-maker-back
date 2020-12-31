import { AppContainer } from '../../container';
import { Request, Response, NextFunction } from 'express';
import { ProjectRepository } from '../../container/repositories/project';
import { RouteRepository } from '../../container/repositories/route';
import { Route, RouteError } from '../../types';
import { RouteErrorRepository } from '../../container/repositories/route-error';
import { ErrorRepository } from '../../container/repositories/error';
import { RuleRepository } from '../../container/repositories/rule';

export const processor = (container: AppContainer) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectRepository = container.get<ProjectRepository>(ProjectRepository);
  const routeRepository = container.get<RouteRepository>(RouteRepository);
  const routeErrorRepository = container.get<RouteErrorRepository>(
    RouteErrorRepository
  );
  const errorRepository = container.get<ErrorRepository>(ErrorRepository);
  const ruleRepository = container.get<RuleRepository>(RuleRepository);

  const { uri, method, projectName } = getRequestInfo(req);
  let sended = false;

  const project = await projectRepository.getByName(projectName);

  if (!project) {
    next();
  }

  const routes = await routeRepository.getByProjectId(project!.id);

  const route = routes.find(
    (route: Route) => route.uri === uri && route.method === method
  );

  if (!route) {
    next();
  }

  const routeErrors = await routeErrorRepository.getByRouteId(route!.id);

  if (routeErrors?.length) {
    const errors = await getRouteErrors(routeErrors, errorRepository);

    for (let error of errors) {
      if (!error) continue;

      const rule = await ruleRepository.getById(error.ruleId);

      if (rule) {
        const { rule: propertie } = rule as any;
        const fields = Object.keys(propertie);
        const value = eval(propertie['field']);

        for (let field of fields) {
          if (field === 'eql') {
            if (value == propertie['eql']) {
              if (!sended) {
                sended = true;
                res
                  .status(error.statusCode)
                  .send({ code: error.code, message: error.message });
              }
            }
          }
        }
      }
    }
  }

  if (!sended) {
    if (!route?.response) {
      res.sendStatus(route!.statusCode);
    } else {
      res.status(route!.statusCode).send(route!.response);
    }
    next();
  }
};

const getRequestInfo = (req: Request) => {
  const [_, projectName] = req.originalUrl.split('/');
  const uri = req.originalUrl.replace(`/${projectName}`, '');
  const method = req.method;
  return {
    uri,
    method,
    projectName,
  };
};

const getRouteErrors = async (
  routeErrors: RouteError[],
  errorRepository: ErrorRepository
) => {
  return await Promise.all(
    routeErrors.map(routeError => errorRepository.getById(routeError.errorId))
  );
};
