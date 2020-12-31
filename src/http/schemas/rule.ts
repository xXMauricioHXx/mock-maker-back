import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
    rule: Joi.object().required(),
  }),
});
