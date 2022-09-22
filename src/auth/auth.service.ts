import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto';
import * as argon from 'argon2';
import { RequestWithUser } from './interfaces';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registrationData: RegisterDto) {
    const hashedPassword = await argon.hash(registrationData.password);

    const createdUser = await this.usersService.createUser({
      ...registrationData,
      password: hashedPassword,
    });
    return createdUser;
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

  async logout(req: RequestWithUser) {
    req.logOut(function (err) {
      if (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
    req.session.cookie.maxAge = 0;
    return {};
  }
}
