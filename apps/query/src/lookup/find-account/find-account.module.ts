import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountRepository } from '@query/common/repository/account.repository';
import { FindAccountController } from './controller/find-account.controller';
import { FindAccountQueryHandler } from './query/find-account.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AccountRepository])],
  controllers: [FindAccountController],
  providers: [FindAccountQueryHandler],
})
export class FindAccountModule {}
