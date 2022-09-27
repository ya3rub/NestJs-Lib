import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class TestHealthIndicator extends HealthIndicator {
  constructor(
  ) {
    super();
  }
 
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const isHealthy = true
      return this.getStatus(key, isHealthy);
    } catch (error) {
      throw new HealthCheckError(
        'Service failed',
        this.getStatus(key, false)
      );
    }
  }
}