import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { AccountEventProducer } from '../common/account-event.producer';
import { DepositFundsHandler } from './commands/deposit-funds.handler';
import { DepositFundsController } from './controllers/deposit-funds.controller';
import { FundsDepositedHandler } from './events/funds-deposited.handler';

@Module({
  imports: [CqrsModule],
  controllers: [DepositFundsController],
  providers: [DepositFundsHandler, FundsDepositedHandler, AccountEventProducer, EventSourcingHandler],
})
export class DepositFundsModule {}
