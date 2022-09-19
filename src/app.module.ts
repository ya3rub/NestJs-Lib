import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as joi from 'joi'
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT:joi.number().required(),
        POSTGRES_HOST:joi.string().required(),
        POSTGRES_PORT:joi.number().required(),
        POSTGRES_USER:joi.string().required(),
        POSTGRES_DB:joi.string().required(),
        POSTGRES_PASSWORD:joi.string().required(),
        JWT_SECRET:joi.string().required(),
        JWT_EXPIRATION:joi.number().required()
      }),
      envFilePath: './.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
