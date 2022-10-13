import { Type } from '@nestjs/common';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/auth/interfaces';

// @Injectable()
// export class EmailConfirmationGuard implements CanActivate {
//   canActivate(context: ExecutionContext) {
//     const request: RequestWithUser = context.switchToHttp().getRequest();

//     if (!request.user?.isEmailConfirmed) {
//       throw new UnauthorizedException('Confirm your email first');
//     }

//     return true;
//   }
// }
@Injectable()
export class EmailConfirmationGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const request: RequestWithUser = context.switchToHttp().getRequest();
    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
