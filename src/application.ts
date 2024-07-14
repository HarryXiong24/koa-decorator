import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { ApplicationOptions } from './types/app-options';
import Container from './container';
import { METADATA_CONTROLLER_PREFIX } from './constants';
import { loadControllers } from './utils';
import * as path from 'path';
import 'reflect-metadata';
import { RouterHandler } from './types/router-handler';

/**
 * Application class, extends from Koa
 */
export default class Application extends Koa {
  private options: ApplicationOptions;
  private router: Router;

  constructor(options: ApplicationOptions) {
    super();

    // save options
    this.options = options;

    // create router
    this.router = new Router();

    // init router
    this.initRouter();

    // load body parser to parse request body
    this.use(bodyParser());

    // load middlewares
    const middlewares = options.middlewares || [];
    middlewares.forEach((m) => {
      this.use(m);
    });

    // load router
    this.use(this.router.routes());
    this.use(this.router.allowedMethods());
  }

  initRouter() {
    // load controllers from the specified directory
    const dir = path.join(
      process.cwd(),
      this.options.controllerDir || './src/controllers'
    );
    // load controllers
    loadControllers(dir);

    // get all routers from container and bind them to koa router
    // example: this.router.get('/path', instance.method.bind(instance))
    Container.routers.forEach((item: RouterHandler) => {
      const instance = Container.get(item.serviceIdentifier);
      // get prefix from controller, like @Controller('/prefix')
      const prefix =
        Reflect.getMetadata(METADATA_CONTROLLER_PREFIX, instance) || '';
      this.router[item.method](
        prefix + item.path,
        (instance[item.methodName] as Function).bind(instance)
      );
    });
  }
}
