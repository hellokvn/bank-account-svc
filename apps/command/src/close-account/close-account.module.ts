import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloseAccountController } from './controllers/close-account.controller';
import { AccountClosedHandler } from './events/account-closed.handler';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { CloseAccountHandler } from './commands/close-account.handler';
import { AccountEventProducer } from '../common/producer/account-event.producer';

@Module({
  imports: [CqrsModule],
  controllers: [CloseAccountController],
  providers: [CloseAccountHandler, AccountClosedHandler, AccountEventProducer, EventSourcingHandler],
})
export class CloseAccountModule {}
