import { Injectable } from '../decorators';
import { LoggerLevel, LoggerCategory } from '../types/logger';

@Injectable()
export default class Logger implements LoggerCategory {
  public trace(message: string, ...args: any[]): LoggerLevel {
    console.trace('Trace: ', message, ...args);
    return LoggerLevel.TRACE;
  }

  public info(message: string, ...args: any[]): LoggerLevel {
    console.info('Info: ', message, ...args);
    return LoggerLevel.INFO;
  }

  public debug(message: string, ...args: any[]): LoggerLevel {
    console.debug('Debug: ', message, ...args);
    return LoggerLevel.DEBUG;
  }

  public warn(message: string, ...args: any[]): LoggerLevel {
    console.warn('Warn: ', message, ...args);
    return LoggerLevel.WARN;
  }

  public error(message: string | Error, ...args: any[]): LoggerLevel {
    console.error('Error: ', message, ...args);
    return LoggerLevel.ERROR;
  }

  public fatal(message: string | Error, ...args: any[]): LoggerLevel {
    console.error('Fatal: ', message, ...args);
    return LoggerLevel.FATAL;
  }
}
