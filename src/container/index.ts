import ContainerInstance from './instance';
import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InjectedHandler } from '../types/handler';
import { RouterHandler } from '../types/handler';

export default class Container {
  private static containerInstance = new ContainerInstance();

  public static getController(identifier: DependencyIdentifier) {
    return Container.containerInstance.getController(identifier);
  }

  public static getAllControllers() {
    return Container.containerInstance.getAllControllers();
  }

  public static getMiddleware(identifier: DependencyIdentifier) {
    return Container.containerInstance.getMiddleware(identifier);
  }

  public static getAllMiddlewares() {
    return Container.containerInstance.getAllMiddlewares();
  }

  public static setController(dependency: DependencyMetadata) {
    return Container.containerInstance.setController(dependency);
  }

  public static setMiddleware(dependency: DependencyMetadata) {
    return Container.containerInstance.setMiddleware(dependency);
  }

  public static registerInjectedHandler(
    identifier: Function,
    injectedHandler: InjectedHandler
  ) {
    return Container.containerInstance.registerInjectedHandler(
      identifier,
      injectedHandler
    );
  }

  public static registerRouter(router: RouterHandler) {
    return Container.containerInstance.registerRouter(router);
  }

  public static get routers() {
    return Container.containerInstance.routers;
  }
}
