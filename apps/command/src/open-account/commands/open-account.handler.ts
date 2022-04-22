import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { OpenAccountCommand } from './open-account.command';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private publisher: EventPublisher;

  public async execute(command: OpenAccountCommand): Promise<void> {
    const aggregate: AccountAggregate = new AccountAggregate();

    this.publisher.mergeObjectContext(aggregate);
    aggregate.openAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
