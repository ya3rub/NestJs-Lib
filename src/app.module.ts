import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as joi from 'joi'
import { DatabaseModule } from '@app/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT:joi.number().required(),
        DATABASE_HOST:joi.string().required(),
        DATABASE_USER:joi.string().required(),
        DATABASE_DB:joi.string().required(),
        DATABASE_PASSWORD:joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    DatabaseModule
    ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
