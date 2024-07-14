import { RequestMethod } from './request';

export interface RouterHandler {
  method: RequestMethod;
  path: string;
  serviceIdentifier: string;
  methodName: string;
}
