import { RequestMethod } from './request';
export interface InjectedHandler {
  object: any;
  key: string;
  type: any;
  index?: number;
}

export interface RouterHandler {
  method: RequestMethod;
  path: string;
  serviceIdentifier: string;
  methodName: string;
}
