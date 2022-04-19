import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { OpenAccountCommand } from './open-account.command';
import { OpenAccountAggregate } from '../aggregates/open-account.aggregate';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<OpenAccountAggregate>;

  @Inject(EventPublisher)
  private publisher: EventPublisher;

  public async execute(command: OpenAccountCommand): Promise<void> {
    const aggregate: OpenAccountAggregate = new OpenAccountAggregate();

    this.publisher.mergeObjectContext(aggregate);
    aggregate.openAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
