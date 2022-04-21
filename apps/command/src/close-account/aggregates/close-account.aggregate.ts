import { CloseAccountCommand } from '../commands/close-account.command';
import { AccountClosedEvent } from '../events/account-closed.event';
import { AccountAggregate } from '@command/common/aggregator/account.aggregator';

export class CloseAccountAggregate extends AccountAggregate {
  public onAccountOpenedEvent(event: AccountClosedEvent): void {
    this.id = event.id;
    this.setActive(false);
  }

  public closeAccount(command: CloseAccountCommand): void {
    const event: AccountClosedEvent = new AccountClosedEvent(command);
    // logic
    this.apply(event);
  }
}
