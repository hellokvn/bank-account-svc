import { HttpException, HttpStatus } from '@nestjs/common';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

import { OpenAccountCommand, CloseAccountCommand } from '@shared/commands';
import { AccountOpenedEvent, AccountClosedEvent } from '@shared/events';

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

  // Open Account

  public openAccount(command: OpenAccountCommand): void {
    console.log('AccountAggregate/openAccount');
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    // logic
    this.apply(event);
  }

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    console.log('AccountAggregate/onAccountOpenedEvent');
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }

  // Close Account

  public closeAccount(command: CloseAccountCommand): void | never {
    if (!this.active) {
      throw new HttpException('This account is already closed!', HttpStatus.BAD_REQUEST);
    }

    const event: AccountClosedEvent = new AccountClosedEvent(command);
    // logic
    this.apply(event);
  }

  public onAccountClosedEvent(event: AccountClosedEvent): void {
    console.log('AccountAggregate/onAccountClosedEvent');
    this.id = event.id;
    this.setActive(false);
  }
}
