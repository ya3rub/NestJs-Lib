import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenOptions } from './config/jwt-sign.options';
import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({ useClass: AccessTokenOptions }),
    EmailConfirmationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
