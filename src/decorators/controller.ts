import 'reflect-metadata';
import { CONTROLLER_ROUTE_PATH_METADATA } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Controller decorator, used to define the prefix of the controller
 *
 * @param prefix
 * @returns
 */
export function Controller(routePrefix: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      CONTROLLER_ROUTE_PATH_METADATA,
      routePrefix,
      target.prototype
    );
    Container.setController({
      id: target.name,
      type: target,
      transient: false,
    });
  };
}
