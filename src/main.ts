import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExcludeNullInterceptor } from '@app/utils/serialization';
//import { Reflector } from '@nestjs/core';
//import { ExceptionsLoggerFilter } from '@app/utils';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExcludeNullInterceptor())
  app.use(cookieParser());
  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));
  //app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(configService.get('PORT'));
}
bootstrap();
