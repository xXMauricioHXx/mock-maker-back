import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    routeId: Joi.string().required(),
    errorId: Joi.string().required(),
  }),
});
