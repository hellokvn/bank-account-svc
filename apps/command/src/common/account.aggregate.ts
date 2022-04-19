import { HttpException } from '@nestjs/common';
import { FundsDepositedEvent } from '../deposit-funds/events/deposit-funds.event';
import { ExtendedAggregateRoot } from 'nest-event-sourcing';
import { AccountOpenedEvent } from '@command/open-account/events/account-opened.event';
import { OpenAccountCommand } from '@command/open-account/commands/open-account.command';

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

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    this.id = event.id;
    this.active = true;
    this.balance = event.openingBalance;
  }

  public onFundsDepositedEvent(event: FundsDepositedEvent): void {
    this.id = event.id;
    this.balance += event.amount;
  }

  public openAccount(command: OpenAccountCommand): void {
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    // logic
    this.apply(event);
  }

  public depositFunds(amount: number): void {
    if (!this.active) {
      throw new HttpException('Funds cannot be deposited into a closed account!', null);
    }

    if (amount <= 0) {
      throw new HttpException('The deposit amount must be greater than 0!', null);
    }

    const event: FundsDepositedEvent = new FundsDepositedEvent();

    event.id = this.id;
    event.amount = amount;

    this.apply(event);
  }
}
