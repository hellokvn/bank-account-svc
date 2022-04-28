import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountRepository } from '@query/common/repository/account.repository';
import { FindAllAccountsController } from './controller/find-all-accounts.controller';
import { FindAllAccountsQueryHandler } from './query/find-all-accounts.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AccountRepository])],
  controllers: [FindAllAccountsController],
  providers: [FindAllAccountsQueryHandler],
})
export class FindAllAccountsModule {}
