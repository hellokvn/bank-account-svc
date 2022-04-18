import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountOpenedEvent } from './account-opened.event';
import { BaseEvent } from 'nest-event-sourcing';
import { AccountEventProducer } from '@command/common/account-event.producer';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle<T extends BaseEvent>(event: T) {
    console.log('____ AccountOpenedHandler/handle');

    const { constructor }: T = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
