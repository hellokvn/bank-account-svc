import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOpenedEvent } from './account-opened.event';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../common/repository/account.repository';
import { Account } from '../../common/entity/account.entity';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async handle(event: AccountOpenedEvent) {
    console.log('eventbus ____ AccountOpenedHandler/handle', { event });
    const account: Account = new Account();

    account.holder = event.accountHolder;
    account.type = event.accountType;
    account.balance = event.openingBalance;
    account.createdDate = event.createdDate;

    this.repository.save(account);
  }
}
