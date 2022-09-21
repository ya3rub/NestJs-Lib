import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  HttpCode,
  Body,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TwoFAService } from './2fa.service';
import { Response } from 'express';
import { RequestWithUser } from '../interfaces';
import { JwtAuthGuard } from '../guards';
import { UsersService } from 'src/users/users.service';
import { TwoFACodeDto } from './dto/twoFACode.dto';
import { AuthService } from '../auth.service';
import { User } from 'src/users/models/user.entity';
import { CurrentUser } from '../decorators';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFAController {
  constructor(
    private readonly usersService: UsersService,
    private readonly twoFAService: TwoFAService,
  ) {}

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @Body() { twoFACode }: TwoFACodeDto,
  ) {
    if (!user) throw new HttpException('ERROR', HttpStatus.SERVICE_UNAVAILABLE);
    await this.twoFAService.authenticate(user, res, twoFACode);
    return user;
  }

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @CurrentUser() user: User,
    @Body() { twoFACode }: TwoFACodeDto,
  ) {
    const isCodeValid = this.twoFAService.is2FACodeValid(twoFACode, user);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOn2FA(user.id);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } = await this.twoFAService.gen2FASecret(request.user);

    return this.twoFAService.pipeQrCodeStream(response, otpauthUrl);
  }
}
