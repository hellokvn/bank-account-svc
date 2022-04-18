import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositFundCommand } from './deposit-funds.command';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { AccountAggregate } from '@command/common/account.aggregator';

@CommandHandler(DepositFundCommand)
export class DepositFundsHandler implements ICommandHandler<DepositFundCommand> {
  @Inject(EventSourcingHandler)
  private eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  public async execute(command: DepositFundCommand) {
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);

    aggregate.depositFunds(command.getAmount());

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
