import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExcludeNullInterceptor } from '@app/utils/serialization';
import * as session from 'express-session';

import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';
import { createClient } from 'redis';
import { PORT, REDIS_HOST, REDIS_PORT, SESSION_SECRET } from './constants';

export type RedisClientType = ReturnType<typeof createClient>;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.use(cookieParser());

  const RedisStore = createRedisStore(session);
  const host = configService.get(REDIS_HOST);
  const port = configService.get(REDIS_PORT);
  console.log(`redis://${host}:${port}`);

  const redis = createClient({
    url: `redis://${host}:${port}`,
    legacyMode: true,
  });
  redis.connect();
  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      secret: configService.get(SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.get(PORT));
}
bootstrap();
