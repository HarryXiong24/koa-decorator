import { RequestMethod } from './request';
import { InstanceType } from './basic';
export interface InjectedHandler {
    instance: InstanceType;
    propertyKey: string;
    type: any;
    propertyIndex?: number;
}
export interface RouterHandler {
    method: RequestMethod;
    path: string;
    serviceIdentifier: string;
    methodName: string;
}
