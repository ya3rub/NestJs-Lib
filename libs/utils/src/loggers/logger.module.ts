import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LogsService from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from './logger';
import { Log } from './log.entity';
import { LogsRepository } from './logs.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [AppLogger, LogsService,LogsRepository],
  exports: [AppLogger],
})
export class LoggerModule {}
