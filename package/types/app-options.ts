import { Middleware } from 'koa';

export interface ApplicationOptions {
  env?: string;
  controllersDir?: string;
  middlewaresDir?: string;
  servicesDir?: string;
  middlewares?: Middleware[];
}
