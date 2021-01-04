import { BaseController } from "./controller";
import { AppContainer } from "../../container";
import { ProjectService } from "../../container/services/project";
import { Controller, Post, Get } from "../decorators";
import { Request, Response, NextFunction } from "express";
import { CreateDTO } from "../dto/project";
import { validatorMiddleware } from "../middlewares/validator";
import { createSchema } from "../schemas/project";

@Controller("/project")
export class ProjectController extends BaseController {
  protected projectService: ProjectService;
  constructor(container: AppContainer) {
    super();
    this.projectService = container.get<ProjectService>(ProjectService);
  }

  @Post("/", [validatorMiddleware(createSchema)])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateDTO = req.body;
      const project = await this.projectService.create(data);
      res.status(201).send(project);
    } catch (err) {
      next(err);
    }
  }

  @Get("/")
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await this.projectService.listAll();
      res.send(projects);
    } catch (err) {
      next(err);
    }
  }
}
