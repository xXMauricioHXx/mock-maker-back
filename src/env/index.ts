import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

const knexfile = require('../../knexfile.js');

dotenv.config();

const props = {
  knexConfig: knexfile,
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 3000,
  httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
};

export const env = new EnvValidator(props);
