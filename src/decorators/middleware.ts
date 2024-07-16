import 'reflect-metadata';
import { MIDDLEWARE_METADATA } from '../constants';
import Container from '../container';
import { Constructor } from '../types/basic';

/**
 * Middleware decorator, used to define the prefix of the middleware
 * @param prefix
 * @returns
 */
export function Middleware(middlewareIdentifier?: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(
      MIDDLEWARE_METADATA,
      middlewareIdentifier,
      target.prototype
    );
    Container.setMiddleware({
      id: target.name,
      type: target,
      transient: false,
    });
  };
}
