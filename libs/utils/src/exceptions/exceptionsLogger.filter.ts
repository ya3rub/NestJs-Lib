import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch() //tocatch all exceptions
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(ExceptionsLoggerFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception.message);
    super.catch(exception, host);
  }
}
