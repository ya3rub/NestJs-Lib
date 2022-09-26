import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsRepository } from './logs.repository';

@Injectable()
export default class LogsService {
  constructor(private logsRepository: LogsRepository) {}

  async createLog(log: CreateLogDto) {
    this.logsRepository.createLog(log);
  }
}
