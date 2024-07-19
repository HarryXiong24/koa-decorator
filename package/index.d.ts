import Koa, { Middleware as Middleware$1 } from 'koa';

type Constructor = new (...args: any[]) => {};
type InstanceType = Record<string, any>;

/**
 * Controller decorator, used to define the prefix of the controller
 *
 * @param prefix
 * @returns
 */
declare function Controller(routePrefix: string): <T extends Constructor>(target: T) => void;

/**
 * InjectService, inject service to class property or constructor parameter
 *
 * @param typeOrName
 * @returns InjectService
 */
declare function Inject(typeOrName?: string): <T extends Object>(target: T, propertyKey: string | symbol, propertyIndex?: number) => void;

/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
declare function Service(serviceIdentifier?: string): <T extends Constructor>(target: T) => void;

declare enum RequestMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    DEL = "delete",
    HEAD = "head",
    OPTIONS = "options"
}

declare function Request(path: string, method: RequestMethod): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function GET(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function POST(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function PUT(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function DELETE(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function DEL(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function HEAD(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
declare function OPTIONS(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;

/**
 * Middleware decorator, used to define the prefix of the middleware
 * @param prefix
 * @returns
 */
declare function Middleware(middlewareIdentifier?: string): <T extends Constructor>(target: T) => void;

/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
declare function Injectable(injectableIdentifier?: string): <T extends Constructor>(target: T) => void;

type DependencyIdentifier = Function | string;
interface DependencyMetadata {
    id?: DependencyIdentifier;
    type?: InstanceType;
    /**
     * Transient is an attribute used to identify the lifecycle of a dependency.
     * It determines the behavior of the dependency throughout the application lifecycle, specifically whether a new instance is created each time the dependency is requested.
     */
    transient?: boolean;
    /**
     * If we don't set up transient to true, the type info will be stored in value and use for next time.
     */
    instance?: InstanceType;
}

interface InjectedHandler {
    instance: InstanceType;
    propertyKey: string;
    type: any;
    propertyIndex?: number;
}
interface RouterHandler {
    method: RequestMethod;
    path: string;
    serviceIdentifier: string;
    methodName: string;
}

declare class Container {
    private static containerInstance;
    static registerInjectedHandler(identifier: Function, injectedHandler: InjectedHandler): void;
    static registerRouter(router: RouterHandler): void;
    static get routers(): RouterHandler[];
    static getController(identifier: DependencyIdentifier): Object;
    static getAllControllers(): Object[];
    static setController(dependency: DependencyMetadata): void;
    static getMiddleware(identifier: DependencyIdentifier): Object;
    static getAllMiddlewares(): Object[];
    static setMiddleware(dependency: DependencyMetadata): void;
    static getService(identifier: DependencyIdentifier): Object;
    static getAllServices(): DependencyMetadata[];
    static setService(dependency: DependencyMetadata): void;
}

interface ApplicationOptions {
    env?: string;
    controllersDir?: string;
    middlewaresDir?: string;
    servicesDir?: string;
    middlewares?: Middleware$1[];
}

/**
 * Application class, extends from Koa
 */
declare class Application extends Koa {
    private options;
    private router;
    constructor(options?: ApplicationOptions);
    private initMiddlewares;
    private initRouter;
}

export { Application, Container, Controller, DEL, DELETE, GET, HEAD, Inject, Injectable, Middleware, OPTIONS, POST, PUT, Request, Service };
