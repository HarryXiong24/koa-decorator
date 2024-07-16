import Container from '../container';
import 'reflect-metadata';

/**
 * InjectService, inject service to class property or constructor parameter
 *
 * @param typeOrName
 * @returns InjectService
 */
export function Inject(typeOrName?: string) {
  return function <T extends Object>(
    target: T,
    propertyKey: string | symbol,
    propertyIndex?: number
  ) {
    if (!typeOrName) {
      typeOrName = Reflect.getMetadata(
        'design:type',
        target,
        propertyKey as string
      ).name;
    }

    Container.registerInjectedHandler(target.constructor, {
      instance: target,
      propertyKey: propertyKey as string,
      type: typeOrName,
      propertyIndex,
    });
  };
}
