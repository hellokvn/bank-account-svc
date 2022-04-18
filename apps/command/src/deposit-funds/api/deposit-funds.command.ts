import { BaseCommand } from 'nest-event-sourcing';
import { DepositFundsDto } from './deposit-funds.dto';

export class DepositFundCommand extends BaseCommand {
  private amount: number;

  constructor(id: string, payload: DepositFundsDto) {
    super();

    this.id = id;
    this.amount = payload.amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
