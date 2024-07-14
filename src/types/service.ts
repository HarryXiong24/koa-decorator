export type ServiceIdentifier = Function | string;

export interface ServiceMetadata {
  id?: ServiceIdentifier;
  type?: Function;
  value?: any;
  transient?: boolean;
}

export interface ServiceOptions {
  id?: string;
  transient?: boolean;
  multiple?: boolean;
}
