import { UnprocessableEntityException } from '@nestjs/common';

export class DuplicateUserException extends UnprocessableEntityException {
  constructor(email: string) {
    super(`Email: ${email} Already Exists.`);
  }
}
