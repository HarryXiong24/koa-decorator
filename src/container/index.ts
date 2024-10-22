import ContainerInstance from './instance';
import { DependencyIdentifier, DependencyMetadata } from '../types/dependency';
import { InjectedHandler, RouterHandler } from '../types/handler';

export default class Container {
  private static containerInstance = new ContainerInstance();

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

  public static getController(identifier: DependencyIdentifier) {
    return Container.containerInstance.getController(identifier);
  }

  public static getAllControllers() {
    return Container.containerInstance.getAllControllers();
  }

  public static setController(dependency: DependencyMetadata) {
    return Container.containerInstance.setController(dependency);
  }

  public static getMiddleware(identifier: DependencyIdentifier) {
    return Container.containerInstance.getMiddleware(identifier);
  }

  public static getAllMiddlewares() {
    return Container.containerInstance.getAllMiddlewares();
  }

  public static setMiddleware(dependency: DependencyMetadata) {
    return Container.containerInstance.setMiddleware(dependency);
  }

  public static getService(identifier: DependencyIdentifier) {
    return Container.containerInstance.getService(identifier);
  }

  public static getAllServices() {
    return Container.containerInstance.getAllServices();
  }

  public static setService(dependency: DependencyMetadata) {
    return Container.containerInstance.setService(dependency);
  }
}
