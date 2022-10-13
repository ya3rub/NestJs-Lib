import { PostgresErrorCode } from '@app/database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-request.dto';

import {
  DuplicateUserException,
  UserEmailNotFoundException,
  UserIdNotFoundException,
} from './exceptions';
import { UsersRepository } from './users.repository';
import * as argon from 'argon2';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserData: CreateUserDto) {
    try {
      const createdUser = await this.usersRepository.create(createUserData);
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new DuplicateUserException(createUserData.email);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getByEmail(email);
    if (user) {
      return user;
    }
    throw new UserEmailNotFoundException(email);
  }

  async getUserById(userId: number) {
    const user = await this.usersRepository.getById(userId);
    if (user) {
      return user;
    }
    throw new UserIdNotFoundException(userId);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await argon.hash(refreshToken);

    return await this.usersRepository.updateWhere(
      { id: userId },
      { currentHashedRefreshToken },
    );
  }

  async removeRefreshToken(userId: number) {
    return await this.usersRepository.updateWhere(
      { id: userId },
      {
        currentHashedRefreshToken: '',
      },
    );
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.updateWhere(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
