import { Module } from '@nestjs/common';
import { OpenAccountController } from './api/open-account.controller';
import { OpenAccountHandler } from './api/open-account.handler';
import { AccountOpenedHandler } from './infrastructur/account-opened.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountEventProducer } from '../common/account-event.producer';
import { EventSourcingModule, EventSourcingHandler } from 'nest-event-sourcing';

@Module({
  imports: [CqrsModule],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler],
})
export class OpenAccountModule {}
