import { BaseEvent } from 'nest-event-sourcing';
import { CloseAccountCommand } from '../commands/close-account.command';

export class AccountClosedEvent extends BaseEvent {
  constructor(command?: CloseAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
  }
}
