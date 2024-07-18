import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InstanceType } from '../types/basic';
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

export default class ContainerInstance
  implements ControllerContainer, ServiceContainer, MiddlewareContainer
{
  private controllerContainer: DependencyMetadata[] = [];
  private middlewareContainer: DependencyMetadata[] = [];
  private serviceContainer: DependencyMetadata[] = [];
  private injectedHandlers: Map<InstanceType, InjectedHandler[]> = new Map();
  public routers: RouterHandler[] = [];

  /**
   * find specific dependency based on identifier in the container
   * @param identifier
   * @param container
   * @returns DependencyMetadata | undefined
   */
  private findDependency(
    identifier: DependencyIdentifier,
    container: DependencyMetadata[]
  ): DependencyMetadata | undefined {
    return container.find((dependency) => {
      return dependency.id === identifier || dependency.type === identifier;
    });
  }

  /**
   * Check if param is primitive
   * @param param
   * @returns boolean
   */
  private isTypePrimitive(param: string): boolean {
    return (
      ['string', 'boolean', 'number', 'object'].indexOf(param.toLowerCase()) !==
      -1
    );
  }

  /**
   * Initialize params, if param is not primitive, get the dependency
   * @param paramTypes
   * @returns any[]
   */
  private initializeParams(
    paramTypes: any[],
    getMethod: (identifier: DependencyIdentifier) => Object
  ): (Object | undefined)[] {
    return paramTypes.map((paramType) => {
      if (
        paramType &&
        paramType.name &&
        !this.isTypePrimitive(paramType.name)
      ) {
        return getMethod(paramType);
      }
    });
  }

  /**
   * Register injected handler
   * @param identifier
   * @param handler
   */
  public registerInjectedHandler(
    identifier: Function,
    injectedHandler: InjectedHandler
  ) {
    if (this.injectedHandlers.get(identifier)) {
      const handlers = this.injectedHandlers.get(identifier) || [];
      handlers.push(injectedHandler);
      this.injectedHandlers.set(identifier, handlers);
    } else {
      this.injectedHandlers.set(identifier, [injectedHandler]);
    }
  }

  /**
   * Register router, add router to the routers array
   * @param router
   */
  public registerRouter(router: RouterHandler) {
    this.routers.push(router);
  }

  /**
   * Get dependency by identifier and return the value, if not found throw an error
   * @param identifier
   * @returns
   */
  public getController(identifier: DependencyIdentifier): Object {
    // console.log('getController', {
    //   identifier: identifier,
    //   container: this.controllerContainer,
    // });
    const dependency = this.findDependency(
      identifier,
      this.controllerContainer
    );
    if (!dependency) {
      throw new Error(`${identifier} dependency not found`);
    }
    if (dependency.instance) {
      return dependency.instance;
    }

    // Get the class of the dependency
    const type = dependency.type;
    if (!type) {
      throw new Error(
        `Cannot determine a class of the requesting dependency "${identifier}"`
      );
    }

    // Get the constructor params
    const paramTypes = Reflect.getMetadata('design:paramtypes', type);

    // Initialize the params
    const params: any[] = paramTypes
      ? this.initializeParams(paramTypes, this.getController)
      : [];

    // Create a new instance of the dependency with the initialized params
    // For example: const value = new (MyClass.bind.apply(MyClass, [null, ...params]))();
    // Equal to: const value = new MyClass(arg1, arg2);
    const instance = new (type.bind.apply(type, [null, ...params]))() as Record<
      string,
      any
    >;

    // Get the handlers for the dependency
    if (this.injectedHandlers.has(type)) {
      const arr: InjectedHandler[] = this.injectedHandlers.get(type) || [];
      arr.forEach((handler) => {
        // value.xxx = xxx
        instance[handler.propertyKey] = this.getService(handler.type);
      });
    }

    if (!dependency.transient) {
      dependency.instance = instance;
    }

    return instance;
  }

  public getAllControllers(): Object[] {
    return this.controllerContainer.map((item) => {
      return this.getController(item.id as string);
    });
  }

  /**
   * Set controller to the container
   * @param dependency
   */
  public setController(dependency: DependencyMetadata): void {
    this.controllerContainer.push(dependency);
  }

  public getMiddleware(identifier: DependencyIdentifier): Object {
    const dependency = this.findDependency(
      identifier,
      this.middlewareContainer
    );
    if (!dependency) {
      throw new Error(`${identifier} dependency not found`);
    }
    if (dependency.instance) {
      return dependency.instance;
    }

    // Get the class of the dependency
    const type = dependency.type;
    if (!type) {
      throw new Error(
        `Cannot determine a class of the requesting dependency "${identifier}"`
      );
    }

    // Get the constructor params
    const paramTypes = Reflect.getMetadata('design:paramtypes', type);
    // Initialize the params
    const params: any[] = paramTypes
      ? this.initializeParams(paramTypes, this.getMiddleware)
      : [];
    // Create a new instance of the dependency with the initialized params
    const instance = new (type.bind.apply(type, [null, ...params]))() as Record<
      string,
      any
    >;

    // Get the handlers for the dependency
    if (this.injectedHandlers.has(type)) {
      const arr = this.injectedHandlers.get(type) || [];
      arr.forEach((handler) => {
        instance[handler.propertyKey] = this.getService(handler.type);
      });
    }

    if (!dependency.transient) {
      dependency.instance = instance;
    }

    return instance;
  }

  public getAllMiddlewares(): Object[] {
    return this.middlewareContainer.map((item) => {
      return this.getMiddleware(item.id as string);
    });
  }

  public setMiddleware(dependency: DependencyMetadata): void {
    this.middlewareContainer.push(dependency);
  }

  public getService(identifier: DependencyIdentifier): Object {
    // console.log('getService', {
    //   identifier: identifier,
    //   container: this.controllerContainer,
    // });
    const dependency = this.findDependency(identifier, this.serviceContainer);
    if (!dependency) {
      throw new Error(`${identifier} dependency not found`);
    }
    if (dependency.instance) {
      return dependency.instance;
    }

    // Get the class of the dependency
    const type = dependency.type;
    if (!type) {
      throw new Error(
        `Cannot determine a class of the requesting dependency "${identifier}"`
      );
    }

    // Get the constructor params
    const paramTypes = Reflect.getMetadata('design:paramtypes', type);
    // Initialize the params
    const params: any[] = paramTypes
      ? this.initializeParams(paramTypes, this.getService)
      : [];

    // Create a new instance of the dependency with the initialized params
    // For example: const value = new (MyClass.bind.apply(MyClass, [null, ...params]))();
    // Equal to: const value = new MyClass(arg1, arg2);
    const instance = new (type.bind.apply(type, [null, ...params]))() as Record<
      string,
      any
    >;

    if (!dependency.transient) {
      dependency.instance = instance;
    }

    return instance;
  }

  public getAllServices(): DependencyMetadata[] {
    return this.serviceContainer.map((item) => {
      return this.getService(item.id as string);
    });
  }

  public setService(dependency: DependencyMetadata): void {
    this.serviceContainer.push(dependency);
  }
}
