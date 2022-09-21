import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TwoFAController } from './2fa/2fa.controller';
import { TwoFAService } from './2fa/2fa.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenOptions } from './config/jwt-sign.options';
import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  JwtTwoFactorStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({ useClass: AccessTokenOptions }),
  ],
  controllers: [AuthController, TwoFAController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtTwoFactorStrategy,
    TwoFAService,
  ],
})
export class AuthModule {}
