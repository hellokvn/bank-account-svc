import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountEventProducer } from '@command/common/account-event.producer';
import { FundsDepositedEvent } from './deposit-funds.event';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle(event: FundsDepositedEvent) {
    console.log('FundsDepositedHandler/handle');

    const { constructor }: FundsDepositedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
