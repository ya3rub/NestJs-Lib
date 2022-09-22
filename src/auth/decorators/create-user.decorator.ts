import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { RequestWithUser } from '../interfaces';

export const getCurrnetRequestByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest<RequestWithUser>();
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    getCurrnetRequestByContext(context).user,
);

