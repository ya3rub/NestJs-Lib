import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/models/user.entity';
import { RequestWithUser } from '../interfaces';

export const getCurrnetRequestByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest<RequestWithUser>();
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    getCurrnetRequestByContext(context).user,
);

export const CurrentResponse = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Response =>
    getCurrnetRequestByContext(context).res,
);
