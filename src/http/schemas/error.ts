import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
    statusCode: Joi.number().required(),
    message: Joi.string().required(),
    ruleId: Joi.string().required(),
  }),
});

export const listByIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string(),
  }),
});

export const deleteSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});

export const updateSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    code: Joi.string(),
    statusCode: Joi.string(),
    message: Joi.string(),
    ruleId: Joi.string(),
  }),
});
