export interface Logger {
  warn(...args: any): void;
  debug(...args: any): void;
  info(...args: any): void;
  error(...args: any): void;
  log(level: string, ...args: any): void;
}
