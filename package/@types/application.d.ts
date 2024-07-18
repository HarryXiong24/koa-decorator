import Koa from 'koa';
import { ApplicationOptions } from './types/app-options';
import 'reflect-metadata';
/**
 * Application class, extends from Koa
 */
export default class Application extends Koa {
    private options;
    private router;
    constructor(options?: ApplicationOptions);
    private initMiddlewares;
    private initRouter;
}
