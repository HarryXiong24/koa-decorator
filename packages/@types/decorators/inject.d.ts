import 'reflect-metadata';
/**
 * InjectService, inject service to class property or constructor parameter
 *
 * @param typeOrName
 * @returns InjectService
 */
export declare function Inject(typeOrName?: string): <T extends Object>(target: T, propertyKey: string | symbol, propertyIndex?: number) => void;
