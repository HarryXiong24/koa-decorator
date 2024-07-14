import { METADATA_CONTROLLER_PREFIX } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
export function Service(serviceIdentifier?: string) {
  return function classDecorator<T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      METADATA_CONTROLLER_PREFIX,
      serviceIdentifier,
      target.prototype
    );
    Container.set({
      id: serviceIdentifier || target.name,
      type: target,
      value: undefined,
      transient: undefined,
    });
  };
}

// Example
// @Service('/api/users')
// class UserService {
//   getUsers() {
//     console.log('Fetching users...');
//   }
// }

// console.log(Reflect.getMetadata(METADATA_CONTROLLER_PREFIX, UserService.prototype));
// const userService = Container.get(UserService);
// userService.getUsers();
