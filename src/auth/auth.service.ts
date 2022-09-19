import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import TokenPayload from './interfaces/tokenPayload.interface';
import { RegisterDto } from './dto';
import { Cookie } from './interfaces';
import * as argon from 'argon2';
import {
  AUTH_COOKIE_NAME,
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
  REFRESH_COOKIE_NAME,
} from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDto) {
    const hashedPassword = await argon.hash(registrationData.password);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });
    return createdUser;
  }

  async login(user: User, res: Response) {
    const authCookie = this.genCookieFromJwtAccessToken(user.id);
    const refreshCookie = this.genCookieFromJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(
      refreshCookie.value,
      user.id,
    );
    res.cookie(authCookie.name, authCookie.value, authCookie.options);
    res.cookie(refreshCookie.name, refreshCookie.value, refreshCookie.options);
  }

  async logout(user: User, res: Response) {
    await this.usersService.removeRefreshToken(user.id);
    const authLogoutCookie = {
      name: AUTH_COOKIE_NAME,
      value: '',
      options: { httpOnly: true, expires: new Date() },
    };
    const refreshLogoutCookie = {
      name: REFRESH_COOKIE_NAME,
      value: '',
      options: { httpOnly: true, expires: new Date() },
    };
    res.cookie(
      authLogoutCookie.name,
      authLogoutCookie.value,
      authLogoutCookie.options,
    );
    res.cookie(
      refreshLogoutCookie.name,
      refreshLogoutCookie.value,
      refreshLogoutCookie.options,
    );
  }

  async refresh(user: User, res: Response) {
    const authCookie = this.genCookieFromJwtAccessToken(user.id);
    res.cookie(authCookie.name, authCookie.value, authCookie.options);
  }
  async authenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async userOfRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.usersService.getUserById(userId);
      await this.verifyRefreshToken(
        refreshToken,
        user.currentHashedRefreshToken,
      );
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await argon.verify(
      hashedPassword,
      plainTextPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyRefreshToken(
    refreshToken: string,
    currentHashedRefreshToken: string,
  ) {
    const refreshTokenIsMatching = await argon.verify(
      currentHashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenIsMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  genCookieFromJwtAccessToken(userId: number): Cookie {
    const tokenPayload: TokenPayload = {
      userId,
    };
    const token = this.jwtService.sign(tokenPayload);
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get(JWT_ACCESS_TOKEN_EXPIRATION),
    );
    return {
      name: AUTH_COOKIE_NAME,
      value: token,
      options: {
        httpOnly: true,
        expires,
      },
    };
  }
  genCookieFromJwtRefreshToken(userId: number): Cookie {
    const tokenPayload: TokenPayload = { userId };
    const expirationTime: number = this.configService.get<number>(
      JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );
    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>(JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${expirationTime}s`,
    });
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expirationTime);
    return {
      name: REFRESH_COOKIE_NAME,
      value: token,
      options: {
        path: '/',
        httpOnly: true,
        expires,
      },
    };
  }
}
