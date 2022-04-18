import { BaseEvent } from 'nest-event-sourcing';

export class FundsDepositedEvent extends BaseEvent {
  public amount: number;
}
