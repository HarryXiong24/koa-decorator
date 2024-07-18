import { Constructor } from '../types/basic';
/**
 * Service decorator, used to define the service
 * @param serviceIdentifier
 * @returns
 */
export declare function Service(serviceIdentifier?: string): <T extends Constructor>(target: T) => void;
