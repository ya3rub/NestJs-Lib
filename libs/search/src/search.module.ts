import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {
  ELASTICSEARCH_NODE,
  ELASTICSEARCH_PASSWORD,
  ELASTICSEARCH_USERNAME,
} from './constants';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get(ELASTICSEARCH_NODE),
        auth: {
          username: configService.get(ELASTICSEARCH_USERNAME),
          password: configService.get(ELASTICSEARCH_PASSWORD),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
