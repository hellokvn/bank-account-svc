import { BaseEvent } from 'nest-event-sourcing';
import { AccountType } from '@command/common/enums/account-type.enum';
import { OpenAccountCommand } from '../commands/open-account.command';

export class AccountOpenedEvent extends BaseEvent {
  public firstName: string;
  public lastName: string;
  public email: string;
  public type: AccountType;
  public openingBalance: number;
  public createdDate: Date;

  constructor(command?: OpenAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.getId();
    this.firstName = command.getFirstName();
    this.lastName = command.getLastName();
    this.email = command.getEmail();
    this.type = command.getType();
    this.openingBalance = command.getOpeningBalance();
    this.createdDate = new Date();
  }
}
