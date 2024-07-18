import 'reflect-metadata';
import { Constructor } from '../types/basic';
/**
 * Controller decorator, used to define the prefix of the controller
 *
 * @param prefix
 * @returns
 */
export declare function Controller(routePrefix: string): <T extends Constructor>(target: T) => void;
