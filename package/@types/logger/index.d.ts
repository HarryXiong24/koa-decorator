import { LoggerLevel, LoggerCategory } from '../types/logger';
export default class Logger implements LoggerCategory {
    trace(message: string, ...args: any[]): LoggerLevel;
    info(message: string, ...args: any[]): LoggerLevel;
    debug(message: string, ...args: any[]): LoggerLevel;
    warn(message: string, ...args: any[]): LoggerLevel;
    error(message: string | Error, ...args: any[]): LoggerLevel;
    fatal(message: string | Error, ...args: any[]): LoggerLevel;
}
