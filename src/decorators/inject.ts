import Container from '../container';
import 'reflect-metadata';

/**
 * InjectService, inject service to class property or constructor parameter
 *
 * @param typeOrName
 * @returns InjectService
 */
export function Inject(typeOrName?: string) {
  return function InjectService<T extends Object>(
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

    Container.registerHandler(target.constructor, {
      object: target,
      key: key as string,
      type: typeOrName,
      index,
    });
  };
}

// Example
// @Service()
// class UserService {
//   public getUsers() {
//     console.log('Fetching users...');
//   }
// }

// @Controller('/home')
// class UserController {
//   @Inject()
//   userService!: UserService;

//   public call() {
//     this.userService.getUsers();
//   }
// }

// const userController = new UserController();
// console.log(Reflect.getMetadata('design:type', userController, 'userService'));
