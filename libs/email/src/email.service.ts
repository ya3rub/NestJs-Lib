import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER } from './constants';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get(EMAIL_SERVICE),
      auth: {
        user: configService.get(EMAIL_USER),
        pass: configService.get(EMAIL_PASSWORD),
      },
    });
  }

  async sendMail(options: Mail.Options) {
    return await this.nodemailerTransport.sendMail(options);
  }
}
