import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupController } from './api/lookup.controller';
import { Account } from './common/entity/account.entity';
import { OpenAccountModule } from './open-account/open-account.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountRepository } from './common/repository/account.repository';
import { FindAccountQueryHandler } from './api/queries/find-account.handler';
import { TypeOrmConfigService } from './common/services/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([AccountRepository]),
    CqrsModule,
    OpenAccountModule,
  ],
  controllers: [LookupController],
  providers: [FindAccountQueryHandler],
})
export class AppModule {}
