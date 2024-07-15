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
    key: string | symbol,
    index?: number
  ) {
    if (!typeOrName) {
      typeOrName = Reflect.getMetadata(
        'design:type',
        target,
        key as string
      ).name;
    }

    Container.registerInjectedHandler(target.constructor, {
      object: target,
      key: key as string,
      type: typeOrName,
      index,
    });
  };
}
