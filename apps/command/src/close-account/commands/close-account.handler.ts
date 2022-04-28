import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { CloseAccountCommand } from '@shared/commands/close-account.command';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler implements ICommandHandler<CloseAccountCommand> {
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: CloseAccountCommand): Promise<void> {
    console.log('CloseAccountHandler/execute');
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate);
    aggregate.closeAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
