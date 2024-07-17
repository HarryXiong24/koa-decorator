export enum LoggerLevel {
  TRACE = 0,
  INFO = 1,
  DEBUG = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

export const LoggerTip = {
  [LoggerLevel.TRACE]: 'Trace',
  [LoggerLevel.INFO]: 'Info',
  [LoggerLevel.DEBUG]: 'DEBUG',
  [LoggerLevel.WARN]: 'Warn',
  [LoggerLevel.ERROR]: 'Error',
  [LoggerLevel.FATAL]: 'Fatal',
};

export interface LoggerCategory {
  trace(message: string, ...args: any[]): LoggerLevel;
  debug(message: string, ...args: any[]): LoggerLevel;
  info(message: string, ...args: any[]): LoggerLevel;
  warn(message: string, ...args: any[]): LoggerLevel;
  error(message: string | Error, ...args: any[]): LoggerLevel;
  fatal(message: string | Error, ...args: any[]): LoggerLevel;
}
