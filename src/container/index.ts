import ContainerInstance from './instance';
import { ServiceIdentifier, ServiceMetadata } from '../types/service';
import { Handler } from '../types/handler';
import { RouterHandler } from '../types/router-handler';

export default class Container {
  private static containerInstance = new ContainerInstance();

  public static get(identifier: ServiceIdentifier) {
    return Container.containerInstance.get(identifier);
  }

  public static set(service: ServiceMetadata) {
    return Container.containerInstance.set(service);
  }

  public static registerHandler(identifier: Function, handler: Handler) {
    return Container.containerInstance.registerHandler(identifier, handler);
  }

  public static registerRouter(router: RouterHandler) {
    return Container.containerInstance.registerRouter(router);
  }

  public static get routers() {
    return Container.containerInstance.routers;
  }
}
