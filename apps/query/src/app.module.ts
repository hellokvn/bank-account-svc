import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { TypeOrmConfigService } from './common/services/typeorm.service';
import { ConsumerModule } from './consumer/consumer.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env' }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    CqrsModule,
    ConsumerModule,
    LookupModule,
  ],
})
export class AppModule {}
