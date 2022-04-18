import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { AccountEventProducer } from '../common/account-event.producer';
import { DepositFundsController } from './api/deposit-funds.controller';
import { DepositFundsHandler } from './api/deposit-funds.handler';
import { FundsDepositedHandler } from './infrastructure/funds-deposited.handler';

@Module({
  imports: [CqrsModule],
  controllers: [DepositFundsController],
  providers: [DepositFundsHandler, FundsDepositedHandler, AccountEventProducer, EventSourcingHandler],
})
export class DepositFundsModule {}
