import { OpenAccountCommand } from '../commands/open-account.command';
import { AccountOpenedEvent } from '../events/account-opened.event';
import { AccountAggregate } from '@command/common/aggregator/account.aggregator';

export class OpenAccountAggregate extends AccountAggregate {
  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }

  public openAccount(command: OpenAccountCommand): void {
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    // logic
    this.apply(event);
  }
}
