import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import { DISABLE_DB_LOG } from './constants';
import LogsService from './logs.service';

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}
@Injectable()
export class AppLogger extends ConsoleLogger {
  private readonly logsService: LogsService;
  private readonly configService: ConfigService;
  private DISABLE_DB_LOG: boolean;
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LogsService,
  ) {
    const environment = configService.get('NODE_ENV');
    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });
    this.configService = configService;
    this.logsService = logsService;
    this.DISABLE_DB_LOG = configService.get<boolean>(DISABLE_DB_LOG);
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);
    if (this.DISABLE_DB_LOG) return;
    this.logsService.createLog({
      message,
      context,
      level: 'log',
    });
  }
  error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);
    if (this.DISABLE_DB_LOG) return;
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);
    if (this.DISABLE_DB_LOG) return;
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
    if (this.DISABLE_DB_LOG) return;
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
    if (this.DISABLE_DB_LOG) return;
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
}
