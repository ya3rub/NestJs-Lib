import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { User } from 'src/users/models/user.entity';
import { ConfirmEmailDto } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.validateConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }
  
  @Post('resend')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@CurrentUser() user: User) {
    await this.emailConfirmationService.resendConfirmationLink(user.id);
  }
}
