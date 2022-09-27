import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { EmailScheduleDto } from './dto';
import { EmailSchedulingService } from './email-scheduling.service';

@Controller('scheduling')
export  class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService
  ) {}
 
  @Post('schedule')
  @UseGuards(JwtAuthGuard)
  scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}