import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OpenAccountController } from './controllers/open-account.controller';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { OpenAccountHandler } from './commands/open-account.handler';
import { AccountEventProducer } from '../common/producer/account-event.producer';
import { OpenAccountSaga } from './sagas/open-account.saga';

@Module({
  imports: [CqrsModule],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler, OpenAccountSaga],
})
export class OpenAccountModule {}
