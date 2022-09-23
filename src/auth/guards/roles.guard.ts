import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { Role } from '../enums';
import { RequestWithUser } from '../interfaces';
import { JwtAuthGuard } from './jwt-auth.guard';

export const AllowOnly = (...roles: Role[]): Type<CanActivate> => {
  class RolesGuard extends JwtAuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const requiredRoles = roles;
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest<RequestWithUser>();
      return requiredRoles.some((role) => user.roles?.includes(role));
    }
  }
  return RolesGuard;
};
