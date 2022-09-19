import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { RequestWithUser } from '../interfaces';

export const getCurrnetUserByContext = (context: ExecutionContext): User => {
    return context.switchToHttp().getRequest<RequestWithUser>().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrnetUserByContext(context),
);
