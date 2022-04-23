import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OpenAccountController } from './controllers/open-account.controller';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { OpenAccountHandler } from './commands/open-account.handler';
import { AccountEventProducer } from '../common/account-event.producer';

@Module({
  imports: [CqrsModule],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler],
})
export class OpenAccountModule {}
