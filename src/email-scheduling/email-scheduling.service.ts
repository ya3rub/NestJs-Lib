import { EmailService } from '@app/email';
import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { EmailScheduleDto } from './dto';
import { CronJob } from 'cron';
@Injectable()
export class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  //   @Cron('* * * * * *') //runs every sec
  //   log() {
  //     console.log('Hello world!');
  //   }

  //   @Interval(60000)
  //   logInt() {
  //     console.log('Called every minute');
  //   }

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content,
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailSchedule.subject}`,
      job,
    );
    job.start();
  }
}
