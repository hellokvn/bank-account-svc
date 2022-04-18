import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseEvent } from 'nest-event-sourcing';
import { AccountEventProducer } from '@command/common/account-event.producer';
import { FundsDepositedEvent } from './deposit-funds.event';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler<FundsDepositedEvent> {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle<T extends BaseEvent>(event: T) {
    console.log('FundsDepositedHandler/handle');

    const { constructor }: T = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
