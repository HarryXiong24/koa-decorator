import ContainerInstance from './instance';
import { DependencyIdentifier, DependencyMetadata } from '../types/service';
import { InjectedHandler } from '../types/handler';
import { RouterHandler } from '../types/handler';

export default class Container {
  private static containerInstance = new ContainerInstance();

  public static get(identifier: DependencyIdentifier) {
    return Container.containerInstance.get(identifier);
  }

  public static set(service: DependencyMetadata) {
    return Container.containerInstance.set(service);
  }

  public static registerHandler(
    identifier: Function,
    handler: InjectedHandler
  ) {
    return Container.containerInstance.registerHandler(identifier, handler);
  }

  public static registerRouter(router: RouterHandler) {
    return Container.containerInstance.registerRouter(router);
  }

  public static get routers() {
    return Container.containerInstance.routers;
  }
}
