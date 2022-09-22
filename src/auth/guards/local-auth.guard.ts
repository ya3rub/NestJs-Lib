import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_STRATEGY } from '../constants';

export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    //if no exception... allow access
    return true;
  }
}
