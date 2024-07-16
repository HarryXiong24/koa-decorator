import { InstanceType } from './basic';

export type DependencyIdentifier = Function | string;

export interface DependencyMetadata {
  id?: DependencyIdentifier;
  type?: InstanceType;
  /**
   * Transient is an attribute used to identify the lifecycle of a dependency.
   * It determines the behavior of the dependency throughout the application lifecycle, specifically whether a new instance is created each time the dependency is requested.
   */
  transient?: boolean;
  /**
   * If we don't set up transient to true, the type info will be stored in value and use for next time.
   */
  instance?: InstanceType;
}
