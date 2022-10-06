import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailOptions, EmailOptionsFactory } from './interfaces';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    @Inject(EMAIL_CONFIG_OPTIONS)
    private EmailConfigProvider: EmailOptionsFactory,
  ) {
    const emailOptions: EmailOptions =
      this.EmailConfigProvider.createEmailOptions();
    this.nodemailerTransport = createTransport({
      service: emailOptions.service,
      auth: {
        user: emailOptions.user,
        pass: emailOptions.password,
      },
    });
  }

  async sendMail(options: Mail.Options) {
    return await this.nodemailerTransport.sendMail(options);
  }
}
