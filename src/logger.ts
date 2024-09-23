import kleur from "kleur";
import { LogLevel, LogMode } from "./types";

interface LogContext {
    [key: string]: any;
};

interface LogMessage {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: LogContext;
};

class Logger {
    private level: LogLevel;
    private mode: LogMode;

    constructor(level: LogLevel = LogLevel.Info, mode: LogMode = LogMode.Plain) {
        this.level = level;
        this.mode = mode;
    }

    private getTimestamp(): string {
        return new Date().toISOString();
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = [
            LogLevel.Debug,
            LogLevel.Info,
            LogLevel.Warn,
            LogLevel.Error,
            LogLevel.Fatal,
        ];

        return levels.indexOf(level) >= levels.indexOf(this.level);
    }
    
    private colorizeLevel(level: LogLevel): string {
        switch (level) {
            case LogLevel.Debug:
                return kleur.magenta(level.toUpperCase());
            case LogLevel.Info:
                return kleur.blue(level.toUpperCase());
            case LogLevel.Warn:
                return kleur.yellow(level.toUpperCase());
            case LogLevel.Error:
                return kleur.red(level.toUpperCase());
            case LogLevel.Fatal:
                return kleur.bgRed().white(level.toUpperCase());
            default:
                return (level as string).toUpperCase();
    }
  }
  
  private formatPlainText(level: LogLevel, message: string, context?: LogContext): string {
    let log = `[${kleur.dim(this.getTimestamp())}] [${this.colorizeLevel(level)}] ${kleur.bold(message)}`;
    if (context) {
        const contextString = Object.entries(context)
        .map(([key, value]) => `${kleur.gray(key)}: ${kleur.cyan(value)}`)
        .join(', ');
      log += ` | ${contextString}`;
    }
    return log;
  }
  
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (this.shouldLog(level)) {
      const logMessage: LogMessage = {
        timestamp: this.getTimestamp(),
        level,
        message,
      };

      if (this.mode === LogMode.Json) {
        const output = {
          ...logMessage,
          ...(context ? { context } : {}),
        };
        console.log(JSON.stringify(output, null, 2));
      } else {
        console.log(this.formatPlainText(level, message, context));
      }
    }
  }
  
  public debug(message: string, context?: LogContext): void {
    this.log(LogLevel.Debug, message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.log(LogLevel.Info, message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.log(LogLevel.Warn, message, context);
  }

  public error(message: string, context?: LogContext): void {
    this.log(LogLevel.Error, message, context);
  }

  public fatal(message: string, context?: LogContext): void {
    this.log(LogLevel.Fatal, message, context);
  }
  
};

export default Logger;
