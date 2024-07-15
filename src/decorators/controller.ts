import 'reflect-metadata';
import { METADATA_CONTROLLER_ROUTE_PATH } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Controller decorator, used to define the prefix of the controller
 *
 * @param prefix
 * @returns
 */
export function Controller(prefix: string) {
  return function classDecorator<T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      METADATA_CONTROLLER_ROUTE_PATH,
      prefix,
      target.prototype
    );
    Container.set({
      id: target.name,
      type: target,
      value: undefined,
      transient: false,
    });
  };
}

// Example
// @Controller('/api/users')
// class UserController {
//   getUsers() {
//     console.log('Fetching users...');
//   }
// }

// console.log(Reflect.getMetadata(METADATA_CONTROLLER_ROUTE_PATH, UserController.prototype));
// const user = Container.get(UserController.name);
// user.getUsers();
