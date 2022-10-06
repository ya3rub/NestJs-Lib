import { DynamicModule, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailOptionsFactory } from './interfaces';
import { Type } from '@nestjs/common';

interface EmailModuleOptions {
  useClass?: Type<EmailOptionsFactory>;
  useValue?: EmailOptionsFactory;
}
@Module({})
export class EmailModule {
  static register(options: EmailModuleOptions): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useClass: options.useClass,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
