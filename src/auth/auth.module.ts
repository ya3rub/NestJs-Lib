import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_ACCESS_TOKEN_SECRET,
} from './constants';
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_ACCESS_TOKEN_SECRET),
        signOptions: {
          expiresIn: `${configService.get(JWT_ACCESS_TOKEN_EXPIRATION)}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
