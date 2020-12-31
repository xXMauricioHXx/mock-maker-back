import Joi from 'joi';
import { RouteMethod } from '../../enums';

export const createSchema = Joi.object({
  body: Joi.object({
    method: Joi.string()
      .valid(...Object.values(RouteMethod))
      .required(),
    uri: Joi.string().required(),
    statusCode: Joi.number().required(),
    response: Joi.object().required(),
    projectId: Joi.string().required(),
  }),
});
