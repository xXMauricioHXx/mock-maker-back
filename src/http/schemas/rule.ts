import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
    rule: Joi.object().required(),
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
  body: Joi.object({
    code: Joi.string(),
    rule: Joi.object(),
  }),
});
