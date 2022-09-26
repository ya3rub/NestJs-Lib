import { AbstractRepository } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './log.entity';

@Injectable()
export class LogsRepository extends AbstractRepository<Log> {
  protected readonly logger: Logger = new Logger(LogsRepository.name);
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {
    super(logsRepository);
  }

  async createLog(log: CreateLogDto) {
    const newLog = await this.logsRepository.create(log);
    await this.logsRepository.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}
