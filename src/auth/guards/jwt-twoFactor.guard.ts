import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_2FA_STRATEGY } from '../constants';
 
@Injectable()
export default class JwtTwoFactorGuard extends AuthGuard(JWT_2FA_STRATEGY) {}