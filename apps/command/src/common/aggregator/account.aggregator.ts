import { HttpException } from '@nestjs/common';
import { ExtendedAggregateRoot } from 'nest-event-sourcing';

export class AccountAggregate extends ExtendedAggregateRoot {
  private active: boolean;
  private balance: number;

  public getActive(): boolean {
    return this.active;
  }

  public setActive(value: boolean) {
    this.active = value;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }
}
