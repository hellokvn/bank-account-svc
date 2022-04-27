import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { AccountOpenedEvent } from '@shared/events';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle(event: AccountOpenedEvent) {
    console.log('AccountOpenedHandler');
    const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
