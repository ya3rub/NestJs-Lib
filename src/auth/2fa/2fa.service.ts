import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { User } from 'src/users/models/user.entity';
import { authenticator } from 'otplib';
import { TWO_FACTOR_AUTHENTICATION_APP_NAME } from '../constants';
import { TwoFACodeDto } from './dto/twoFACode.dto';
import { AuthService } from '../auth.service';
@Injectable()
export class TwoFAService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}


  async authenticate(
    user:User,
    res:Response,
    twoFACode:string
  ) {

    const isCodeValid = this.is2FACodeValid(
      twoFACode,
      user,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const {accessToken, accessTokenExpirationTime} = this.authService.genAccessToken({
      userId: user.id,
      isSecondFactorAuthenticated: true,
    });

    const authCookie = this.authService.genCookieFromJwtAccessToken(
      accessToken,
      accessTokenExpirationTime,
    );

    res.cookie(authCookie.name, authCookie.value, authCookie.options);
      
  }

  public is2FACodeValid(twoFACode: string, user: User) {
    return authenticator.verify({
      token: twoFACode,
      secret: user.twoFASecret,
    });
  }

  public async gen2FASecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get(TWO_FACTOR_AUTHENTICATION_APP_NAME),
      secret,
    );

    await this.usersService.set2FASecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
