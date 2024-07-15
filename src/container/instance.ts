import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InjectedHandler } from '../types/handler';
import { RouterHandler } from '../types/handler';
import 'reflect-metadata';

export default class ContainerInstance {
  private controllerContainer: DependencyMetadata[] = [];
  private middlewareContainer: DependencyMetadata[] = [];
  private handlers: Map<Function, InjectedHandler[]> = new Map();
  public routers: RouterHandler[] = [];

  /**
   * Find Dependency by identifier
   * @param identifier
   * @returns DependencyMetadata
   */
  private findController(
    identifier: DependencyIdentifier
  ): DependencyMetadata | undefined {
    return this.controllerContainer.find((dependency) => {
      return dependency.id === identifier || dependency.type === identifier;
    });
  }

  /**
   * Get dependency by identifier
   * @param identifier
   * @returns DependencyMetadata
   */
  private findMiddleware(
    identifier: DependencyIdentifier
  ): DependencyMetadata | undefined {
    return this.middlewareContainer.find((dependency) => {
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
  private initializeControllerParams(paramTypes: any[]): any[] {
    return paramTypes.map((paramType) => {
      if (
        paramType &&
        paramType.name &&
        !this.isTypePrimitive(paramType.name)
      ) {
        return this.getController(paramType);
      }
      return undefined;
    });
  }

  private initializeMiddlewareParams(paramTypes: any[]): any[] {
    return paramTypes.map((paramType) => {
      if (
        paramType &&
        paramType.name &&
        !this.isTypePrimitive(paramType.name)
      ) {
        return this.getMiddleware(paramType);
      }
      return undefined;
    });
  }

  /**
   * Get dependency by identifier and return the value, if not found throw an error
   * @param identifier
   * @returns
   */
  public getController(identifier: DependencyIdentifier) {
    console.log('getController', {
      identifier: identifier,
      container: this.controllerContainer,
    });
    const dependency = this.findController(identifier);
    if (!dependency) {
      throw new Error(`${identifier} dependency not found`);
    }
    if (dependency.value) {
      return dependency.value;
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
      ? this.initializeControllerParams(paramTypes)
      : [];
    // Create a new instance of the dependency with the initialized params
    const value = new (type.bind.apply(type, [null, ...params]))();
    // Get the handlers for the dependency
    if (this.handlers.has(type)) {
      const arr = this.handlers.get(type) || [];
      arr.forEach((handler) => {
        value[handler.key] = this.getController(handler.type);
        console.log('value[handler.key]', value[handler.key]);
      });
    }
    console.log('handler', value);

    if (!dependency.transient) {
      dependency.value = value;
    }

    return value;
  }

  public getMiddleware(identifier: DependencyIdentifier) {
    console.log('getMiddleware', {
      identifier: identifier,
      container: this.middlewareContainer,
    });
    const dependency = this.findMiddleware(identifier);
    if (!dependency) {
      throw new Error(`${identifier} dependency not found`);
    }
    if (dependency.value) {
      return dependency.value;
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
      ? this.initializeMiddlewareParams(paramTypes)
      : [];
    // Create a new instance of the dependency with the initialized params
    const value = new (type.bind.apply(type, [null, ...params]))();
    // Get the handlers for the dependency
    if (this.handlers.has(type)) {
      const arr = this.handlers.get(type) || [];
      arr.forEach((handler) => {
        value[handler.key] = this.getMiddleware(handler.type);
      });
    }

    if (!dependency.transient) {
      dependency.value = value;
    }

    return value;
  }

  public getAllMiddlewares() {
    return this.middlewareContainer;
  }

  public setController(dependency: DependencyMetadata) {
    this.controllerContainer.push(dependency);
  }

  public setMiddleware(dependency: DependencyMetadata) {
    this.middlewareContainer.push(dependency);
  }

  public exist(): boolean {
    return true;
  }

  /**
   * Register handler
   * @param identifier
   * @param handler
   */
  public registerInjectedHandler(
    identifier: Function,
    handler: InjectedHandler
  ) {
    if (this.handlers.get(identifier)) {
      const handlers = this.handlers.get(identifier) || [];
      handlers.push(handler);
      this.handlers.set(identifier, handlers);
    } else {
      this.handlers.set(identifier, [handler]);
    }
  }

  public registerRouter(router: RouterHandler) {
    this.routers.push(router);
  }
}
