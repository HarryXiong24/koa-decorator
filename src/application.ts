import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { ApplicationOptions } from './types/app-options';
import Container from './container';
import {
  CONTROLLER_ROUTE_PATH_METADATA,
  MIDDLEWARE_METADATA,
} from './constants';
import { loadImport } from './utils/import-loader';
import * as path from 'path';
import 'reflect-metadata';
import { RouterHandler } from './types/handler';
import { DependencyMetadata } from './types/dependency';

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
    this.initMiddlewares();

    // load router
    this.use(this.router.routes());
    this.use(this.router.allowedMethods());
  }

  initMiddlewares() {
    if (this.options.middlewares) {
      const middlewares = this.options.middlewares || [];

      middlewares.forEach((m) => {
        this.use(m);
      });
    } else {
      const middlewaresName: any[] = [];

      const dir = path.join(
        process.cwd(),
        this.options.controllerDir || './src/middlewares'
      );
      // load middlewares
      loadImport(dir);

      Container.getAllMiddlewares().forEach((item: DependencyMetadata) => {
        middlewaresName.push(item.type);
      });

      middlewaresName.forEach((item) => {
        const ErrorHandlerClass = item;

        const errorHandlerInstance = new ErrorHandlerClass();
        this.use(errorHandlerInstance.use());
      });
    }
  }

  initRouter() {
    // load controllers from the specified directory
    const dir = path.join(
      process.cwd(),
      this.options.controllerDir || './src/controllers'
    );
    // load controllers
    loadImport(dir);

    // get all routers from container and bind them to koa router
    // example: this.router.get('/path', instance.method.bind(instance))
    Container.routers.forEach((item: RouterHandler) => {
      const instance = Container.getController(item.serviceIdentifier);
      // get prefix from controller, like @Controller('/prefix')
      const prefix =
        Reflect.getMetadata(CONTROLLER_ROUTE_PATH_METADATA, instance) || '';
      this.router[item.method](
        prefix + item.path,
        (instance[item.methodName] as Function).bind(instance)
      );
    });
  }
}
