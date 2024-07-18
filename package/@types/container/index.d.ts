import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InjectedHandler, RouterHandler } from '../types/handler';
export default class Container {
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
