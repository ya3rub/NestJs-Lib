import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { RegisterDto } from './dto';
import { LocalAuthGuard } from './guards';
import { CookieAuthGuard } from './guards/cookieAuth.guard';
import { RequestWithUser } from './interfaces';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Get()
  async isAutheticated(@CurrentUser() user) {
    return user;
  }

  @UseGuards(CookieAuthGuard)
  @Delete('logout')
  async logout(@Req() request: RequestWithUser) {
    return this.authService.logout(request);
  }
}
