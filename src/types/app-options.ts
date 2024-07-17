import { Middleware } from 'koa';

export interface ApplicationOptions {
  env?: string;
  controllerDir?: string;
  middlewares?: Middleware[];
}
