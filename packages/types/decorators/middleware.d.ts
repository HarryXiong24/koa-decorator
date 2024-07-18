import 'reflect-metadata';
import { Constructor } from '../types/basic';
/**
 * Middleware decorator, used to define the prefix of the middleware
 * @param prefix
 * @returns
 */
export declare function Middleware(middlewareIdentifier?: string): <T extends Constructor>(target: T) => void;
