import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
  }),
});
