import {
  EMAIL_PASSWORD,
  EMAIL_SERVICE,
  EMAIL_USER,
} from '@app/email/constants';
import { EmailOptions, EmailOptionsFactory } from '@app/email/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailModuleOptionsProvider implements EmailOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createEmailOptions(): EmailOptions {
    const emailOptions: EmailOptions = {
      service: this.configService.get(EMAIL_SERVICE),
      user: this.configService.get(EMAIL_USER),
      password: this.configService.get(EMAIL_PASSWORD),
    }; 
    return emailOptions;
  }
}
