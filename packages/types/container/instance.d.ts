import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InjectedHandler, RouterHandler } from '../types/handler';
import 'reflect-metadata';
interface ControllerContainer {
    getController: (identifier: DependencyIdentifier) => Object;
    getAllControllers: () => DependencyMetadata[];
    setController: (dependency: DependencyMetadata) => void;
}
interface ServiceContainer {
    getService: (identifier: DependencyIdentifier) => Object;
    getAllServices: () => DependencyMetadata[];
    setService: (dependency: DependencyMetadata) => void;
}
interface MiddlewareContainer {
    getMiddleware: (identifier: DependencyIdentifier) => Object;
    getAllMiddlewares: () => DependencyMetadata[];
    setMiddleware: (dependency: DependencyMetadata) => void;
}
export default class ContainerInstance implements ControllerContainer, ServiceContainer, MiddlewareContainer {
    private controllerContainer;
    private middlewareContainer;
    private serviceContainer;
    private injectedHandlers;
    routers: RouterHandler[];
    /**
     * find specific dependency based on identifier in the container
     * @param identifier
     * @param container
     * @returns DependencyMetadata | undefined
     */
    private findDependency;
    /**
     * Check if param is primitive
     * @param param
     * @returns boolean
     */
    private isTypePrimitive;
    /**
     * Initialize params, if param is not primitive, get the dependency
     * @param paramTypes
     * @returns any[]
     */
    private initializeParams;
    /**
     * Register injected handler
     * @param identifier
     * @param handler
     */
    registerInjectedHandler(identifier: Function, injectedHandler: InjectedHandler): void;
    /**
     * Register router, add router to the routers array
     * @param router
     */
    registerRouter(router: RouterHandler): void;
    /**
     * Get dependency by identifier and return the value, if not found throw an error
     * @param identifier
     * @returns
     */
    getController(identifier: DependencyIdentifier): Object;
    getAllControllers(): Object[];
    /**
     * Set controller to the container
     * @param dependency
     */
    setController(dependency: DependencyMetadata): void;
    getMiddleware(identifier: DependencyIdentifier): Object;
    getAllMiddlewares(): Object[];
    setMiddleware(dependency: DependencyMetadata): void;
    getService(identifier: DependencyIdentifier): Object;
    getAllServices(): DependencyMetadata[];
    setService(dependency: DependencyMetadata): void;
}
export {};
