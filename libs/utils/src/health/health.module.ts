import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TestHealthIndicator } from './indicators/testHealthIndicator';
@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [TestHealthIndicator],
})
export class HealthModule {}
