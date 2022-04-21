import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { CloseAccountCommand } from './close-account.command';
import { CloseAccountAggregate } from '../aggregates/close-account.aggregate';

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler implements ICommandHandler<CloseAccountCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<CloseAccountAggregate>;

  @Inject(EventPublisher)
  private publisher: EventPublisher;

  public async execute(command: CloseAccountCommand): Promise<void> {
    const aggregate: CloseAccountAggregate = new CloseAccountAggregate();

    this.publisher.mergeObjectContext(aggregate);
    aggregate.closeAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
