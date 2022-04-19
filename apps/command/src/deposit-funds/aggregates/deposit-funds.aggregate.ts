import { AccountAggregate } from '@command/common/aggregator/account.aggregator';
import { HttpException } from '@nestjs/common';
import { FundsDepositedEvent } from '../events/deposit-funds.event';

export class DepositFundsAggregate extends AccountAggregate {
  public onFundsDepositedEvent(event: FundsDepositedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }

  public depositFunds(amount: number): void {
    if (!this.getActive()) {
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
