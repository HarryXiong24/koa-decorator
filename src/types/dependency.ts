export type DependencyIdentifier = Function | string;

export interface DependencyMetadata {
  id?: DependencyIdentifier;
  type?: Function;
  value?: any;
  transient?: boolean;
}
