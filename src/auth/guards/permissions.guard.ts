import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { Permission, Role } from '../enums';
import { RequestWithUser } from '../interfaces';
import { JwtAuthGuard } from './jwt-auth.guard';

export const AllowIfHas = (...permissions: Permission[]): Type<CanActivate> => {
  class PermissionGuard extends JwtAuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const requiredRoles = permissions;
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest<RequestWithUser>();
      return requiredRoles.some((permission) =>
        user.permissions?.includes(permission),
      );
    }
  }
  return PermissionGuard;
};
