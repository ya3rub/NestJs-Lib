import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import TokenPayload from '../interfaces/tokenPayload.interface';
import {
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_STRATEGY,
} from '../constants';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN_STRATEGY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request.cookies);
          
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get(JWT_REFRESH_TOKEN_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, tokenPayload: TokenPayload): Promise<User> {
    const refreshToken = request.cookies?.Refresh;
    return this.authService.userOfRefreshToken(
      refreshToken,
      tokenPayload.userId,
    );
  }
}
