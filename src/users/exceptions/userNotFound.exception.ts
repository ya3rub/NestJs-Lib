
import { NotFoundException } from '@nestjs/common';

export class UserIdNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}


export class UserEmailNotFoundException extends NotFoundException {
    constructor(email: string) {
      super(`User with id ${email} not found`);
    }
  }
  