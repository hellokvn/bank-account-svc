import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { CloseAccountCommand } from '../../../../shared/commands/close-account.command';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler implements ICommandHandler<CloseAccountCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private publisher: EventPublisher;

  public async execute(command: CloseAccountCommand): Promise<void> {
    console.log('CloseAccountHandler/execute');
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate);
    aggregate.closeAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
