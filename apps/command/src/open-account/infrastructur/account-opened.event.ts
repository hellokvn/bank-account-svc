import { BaseEvent } from 'nest-event-sourcing';
import { OpenAccountCommand } from '../api/open-account.command';

export class AccountOpenedEvent extends BaseEvent {
  public accountHolder: string;
  public accountType: string;
  public openingBalance: number;
  public createdDate: Date;

  constructor(command?: OpenAccountCommand) {
    console.log('AccountOpenedEvent/constructor');
    super();

    if (!command) {
      return;
    }

    this.id = command.getId();
    this.accountHolder = command.getAccountHolder();
    this.accountType = command.getAccountType();
    this.openingBalance = command.getOpeningBalance();
    this.createdDate = new Date();
  }
}
