import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  DB_POSTGRES_TYPE,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  USE_TYPEORM_LOGGER,
} from './constants';
//import { DBConsoleLogger } from './dbLogger';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      name: 'default',
      type: DB_POSTGRES_TYPE,
      host: this.configService.get<string>(POSTGRES_HOST),
      port: this.configService.get<number>(POSTGRES_PORT),
      username: this.configService.get<string>(POSTGRES_USER),
      password: this.configService.get<string>(POSTGRES_PASSWORD),
      database: this.configService.get<string>(POSTGRES_DB),
      synchronize: true,
      //logger: new DBConsoleLogger(),
      logging: this.configService.get<boolean>(USE_TYPEORM_LOGGER),
      entities: [],
      autoLoadEntities: true,
    };
  }
}
