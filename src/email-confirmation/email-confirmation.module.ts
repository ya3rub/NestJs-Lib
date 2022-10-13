import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '@app/email';
import { EmailModuleOptionsProvider, VerificationTokenOptionsProvider } from './config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: VerificationTokenOptionsProvider }),
    EmailModule.register({ useClass: EmailModuleOptionsProvider }),
    ConfigModule,
    UsersModule,
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports:[EmailConfirmationService]
})
export class EmailConfirmationModule {}
