import { CONTROLLER_ROUTE_PATH_METADATA } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
export function Injectable(injectableIdentifier?: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      CONTROLLER_ROUTE_PATH_METADATA,
      injectableIdentifier,
      target.prototype
    );
    Container.setService({
      id: injectableIdentifier || target.name,
      type: target,
      transient: false,
    });
  };
}
