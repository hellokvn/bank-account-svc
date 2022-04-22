import { HttpException, HttpStatus } from '@nestjs/common';
import { ExtendedAggregateRoot } from 'nest-event-sourcing';
import { CloseAccountCommand } from '@command/close-account/commands/close-account.command';
import { AccountClosedEvent } from '@command/close-account/events/account-closed.event';
import { OpenAccountCommand } from '@shared/commands';
import { AccountOpenedEvent } from '@shared/events';

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

  // methods

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    console.log('AccountAggregate/onAccountOpenedEvent');
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }

  public openAccount(command: OpenAccountCommand): void {
    console.log('AccountAggregate/openAccount');
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    // logic
    this.apply(event);
  }

  // methods

  public onAccountClosedEvent(event: AccountClosedEvent): void {
    console.log('AccountAggregate/onAccountClosedEvent');
    this.id = event.id;
    this.setActive(false);
  }

  public closeAccount(command: CloseAccountCommand): void | never {
    console.log('AccountAggregate/closeAccount', this.active);
    if (!this.active) {
      throw new HttpException('This account is already closed!', HttpStatus.BAD_REQUEST);
    }

    const event: AccountClosedEvent = new AccountClosedEvent(command);
    // logic
    this.apply(event);
  }
}
