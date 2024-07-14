import { ServiceIdentifier, ServiceMetadata } from '../types/service';
import { Handler } from '../types/handler';
import { RouterHandler } from '../types/router-handler';
import 'reflect-metadata';

export default class ContainerInstance {
  private container: ServiceMetadata[] = [];
  private handlers: Map<Function, Handler[]> = new Map();
  public routers: RouterHandler[] = [];

  /**
   * Find service by identifier
   * @param identifier
   * @returns ServiceMetadata
   */
  private findService(
    identifier: ServiceIdentifier
  ): ServiceMetadata | undefined {
    return this.container.find((service) => {
      return service.id === identifier || service.type === identifier;
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
   * Initialize params, if param is not primitive, get the service
   * @param paramTypes
   * @returns any[]
   */
  private initializeParams(paramTypes: any[]): any[] {
    return paramTypes.map((paramType) => {
      if (
        paramType &&
        paramType.name &&
        !this.isTypePrimitive(paramType.name)
      ) {
        return this.get(paramType);
      }
      return undefined;
    });
  }

  /**
   * Get service by identifier and return the value, if not found throw an error
   * @param identifier
   * @returns
   */
  public get(identifier: ServiceIdentifier) {
    console.log({
      identifier: identifier,
      container: this.container,
    });
    const service = this.findService(identifier);
    if (!service) {
      throw new Error(`${identifier} service not found`);
    }
    if (service.value) {
      return service.value;
    }

    // Get the class of the service
    const type = service.type;
    if (!type) {
      throw new Error(
        `Cannot determine a class of the requesting service "${identifier}"`
      );
    }

    // Get the constructor params
    const paramTypes = Reflect.getMetadata('design:paramtypes', type);
    // Initialize the params
    const params: any[] = paramTypes ? this.initializeParams(paramTypes) : [];
    // Create a new instance of the service with the initialized params
    const value = new (type.bind.apply(type, [null, ...params]))();
    // Get the handlers for the service
    if (this.handlers.has(type)) {
      const arr = this.handlers.get(type) || [];
      arr.forEach((handler) => {
        value[handler.key] = this.get(handler.type);
      });
    }

    if (!service.transient) {
      service.value = value;
    }

    return value;
  }

  public set(service: ServiceMetadata) {
    this.container.push(service);
  }

  public exist(): boolean {
    return true;
  }

  /**
   * Register handler
   * @param identifier
   * @param handler
   */
  public registerHandler(identifier: Function, handler: Handler) {
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
