import Joi from 'joi';

export const createSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
  }),
});

export const deleteSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});
