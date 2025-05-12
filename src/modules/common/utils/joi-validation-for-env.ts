import * as Joi from 'joi';
import { Environments } from 'modules/common/enums/environments.enum';

export const EnvValidationSchema = Joi.object().keys({
  NODE_ENV: Joi.valid(
    Environments.Development,
    Environments.Production,
    Environments.Testing,
  ).required(),
  APP_PORT: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
