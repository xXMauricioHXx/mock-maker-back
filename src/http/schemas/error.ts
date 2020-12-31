import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
    statusCode: Joi.number().required(),
    message: Joi.string().required(),
    ruleId: Joi.string().required(),
  }),
});
