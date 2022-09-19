import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import TokenPayload from './interfaces/tokenPayload.interface';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto';
import { Cookie } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }

  async login(user: User, res: Response) {
    const authCookie = this.genCookieFromJwtToken(user.id);
    res.cookie(authCookie.name, authCookie.value, authCookie.options);
  }

  logout(res: Response) {
    const logoutCookie: Cookie = {
      name: 'Authentication',
      value: '',
      options: { httpOnly: true, expires: new Date() },
    };
    res.cookie(logoutCookie.name, logoutCookie.value, logoutCookie.options);
  }

  async getAuthenticateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
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
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  genCookieFromJwtToken(userId: number): Cookie {
    const tokenPayload: TokenPayload = {
      userId,
    };
    const token = this.jwtService.sign(tokenPayload);
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    return {
      name: 'Authentication',
      value: token,
      options: {
        httpOnly: true,
        expires,
      },
    };
  }
}
