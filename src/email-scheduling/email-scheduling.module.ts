import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailSchedulingController } from './email-scheduling.controller';
import { EmailModule } from '@app/email';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EmailModuleOptionsProvider } from './emailOptions.provider';
@Module({
  imports: [
    EmailModule.register({
      useClass: EmailModuleOptionsProvider,
    }),
  ],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService, SchedulerRegistry],
  exports:[EmailSchedulingService]
})
export class EmailSchedulingModule {}
