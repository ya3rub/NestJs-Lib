import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { APP_FILTER } from '@nestjs/core';
import {
  ExceptionsLoggerFilter,
  NotFoundHttpExceptionFilter,
} from '@app/utils/exceptions';
import { LogsMiddleware } from '@app/utils/loggers';
import { LoggerModule } from '@app/utils/loggers/logger.module';
import { HealthModule } from '@app/utils/health/health.module';
import { SearchModule } from 'libs/search/src';
import { AppController } from './app.controller';
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DISABLE_DB_LOG: joi.boolean().required(),
        USE_TYPEORM_LOGGER: joi.boolean().required(),
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.number().required(),
        POSTGRES_USER: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION: joi.number().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: joi.number().required(),
        ELASTICSEARCH_NODE: joi.string().required(),
        ELASTICSEARCH_USERNAME: joi.string().required(),
        ELASTICSEARCH_PASSWORD: joi.string().required(),
        EMAIL_SERVICE: joi.string().required(),
        EMAIL_USER: joi.string().required(),
        EMAIL_PASSWORD: joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXP_TIME: joi.string().required(),
        EMAIL_CONFIRMATION_URL: joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    DatabaseModule,
    SearchModule,
    AuthModule,
    UsersModule,
    PostsModule,
    LoggerModule,
    HealthModule,
    EmailSchedulingModule,
    EmailConfirmationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundHttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
