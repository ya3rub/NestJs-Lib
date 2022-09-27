import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailSchedulingController } from './email-scheduling.controller';
import { EmailModule } from '@app/email';
import { SchedulerRegistry } from '@nestjs/schedule';
@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService, SchedulerRegistry],
})
export class EmailSchedulingModule {}
