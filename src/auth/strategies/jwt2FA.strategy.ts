import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JWT_2FA_STRATEGY, JWT_ACCESS_TOKEN_SECRET } from '../constants';
import TokenPayload from '../interfaces/tokenPayload.interface';

 
@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  JWT_2FA_STRATEGY
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get(JWT_ACCESS_TOKEN_SECRET)
    });
  }
 
  async validate(payload: TokenPayload) {
    const user = await this.userService.getUserById(payload.userId);
    
    if (!user.is2FAEnabled) {
      return user;
    }
    if (payload.isSecondFactorAuthenticated) {
      console.log(user);
      return user;
    }
  }
}