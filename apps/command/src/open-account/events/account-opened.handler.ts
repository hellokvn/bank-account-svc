import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountEventProducer } from '@command/common/account-event.producer';
import { AccountOpenedEvent } from '@shared/events';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle(event: AccountOpenedEvent) {
    console.log('AccountOpenedHandler/handle PUBLISH');
    const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
