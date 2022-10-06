import { EmailService } from '@app/email';
import { Controller, Get } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling/email-scheduling.service';

@Controller('')
export class AppController {
  constructor(private readonly emailService: EmailSchedulingService) {}
  @Get()
  async test() {
    
  }
}
