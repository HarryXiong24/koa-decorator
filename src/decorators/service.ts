import { CONTROLLER_ROUTE_PATH_METADATA } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
export function Service(serviceIdentifier?: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      CONTROLLER_ROUTE_PATH_METADATA,
      serviceIdentifier,
      target.prototype
    );
    Container.setController({
      id: serviceIdentifier || target.name,
      type: target,
      value: undefined,
      transient: undefined,
    });
  };
}
