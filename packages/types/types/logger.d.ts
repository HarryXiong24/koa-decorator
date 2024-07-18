export declare enum LoggerLevel {
    TRACE = 0,
    INFO = 1,
    DEBUG = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5
}
export declare const LoggerTip: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
};
export interface LoggerCategory {
    trace(message: string, ...args: any[]): LoggerLevel;
    debug(message: string, ...args: any[]): LoggerLevel;
    info(message: string, ...args: any[]): LoggerLevel;
    warn(message: string, ...args: any[]): LoggerLevel;
    error(message: string | Error, ...args: any[]): LoggerLevel;
    fatal(message: string | Error, ...args: any[]): LoggerLevel;
}
