import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import {
  JWT_VERIFICATION_TOKEN_EXP_TIME,
  JWT_VERIFICATION_TOKEN_SECRET,
} from '../constants';

@Injectable()
export class VerificationTokenOptionsProvider implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>(JWT_VERIFICATION_TOKEN_SECRET),
      signOptions: {
        expiresIn: `${this.configService.get(
          JWT_VERIFICATION_TOKEN_EXP_TIME,
        )}s`,
      },
    };
  }
}
