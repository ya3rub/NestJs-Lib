import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory{
    constructor(private readonly configService : ConfigService){}
    createTypeOrmOptions():TypeOrmModuleOptions{
        return{
            name:'default',
            type:'postgres',
            host:this.configService.get<string>('DATABASE_HOST'),
            port:this.configService.get<number>('DATABASE_PORT'),
            username:this.configService.get<string>('DATABASE_USER'),
            password:this.configService.get<string>('DATABASE_PASSWORD'),
            database:this.configService.get<string>('DATABASE_DB'),
            synchronize:true,
            dropSchema:false,
            logging:true,
            entities:['dist/**/*.entity.js']
        }
    }
}
