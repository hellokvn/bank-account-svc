import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositFundCommand } from './deposit-funds.command';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { DepositFundsAggregate } from '../aggregates/deposit-funds.aggregate';

@CommandHandler(DepositFundCommand)
export class DepositFundsHandler implements ICommandHandler<DepositFundCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<DepositFundsAggregate>;

  public async execute(command: DepositFundCommand) {
    const aggregate: DepositFundsAggregate = await this.eventSourcingHandler.getById(DepositFundsAggregate, command.id);

    aggregate.depositFunds(command.getAmount());

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
