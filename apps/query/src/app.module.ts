import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupController } from './api/lookup.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountRepository } from './common/repository/account.repository';
import { FindAccountQueryHandler } from './api/queries/find-account.handler';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { ConsumerModule } from './consumer/consumer.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    CqrsModule,
    ConsumerModule,
    LookupModule,
  ],
  controllers: [LookupController],
  providers: [FindAccountQueryHandler],
})
export class AppModule {}
