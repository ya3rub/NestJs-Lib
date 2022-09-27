import { EmailService } from '@app/email';
import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  async test() {
    return await this.emailService.sendMail({
      to: 'he111oworld101@gmail.com',
      subject: 'test3',
      text: 'testing3',
    });
  }
}
