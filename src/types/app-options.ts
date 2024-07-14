import { Logger } from './logger';
import { Middleware } from 'koa';

export interface ApplicationOptions {
  env?: string;
  controllerDir?: string;
  configDir?: string;
  logger?: Logger;
  middlewares?: Middleware[];
}
