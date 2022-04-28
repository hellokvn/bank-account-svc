import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountOpenedEvent } from '@shared/events';
import { Account } from '@query/common/entity/account.entity';
import { AccountRepository } from '@query/common/repository/account.repository';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @InjectRepository(AccountRepository)
  private readonly repository: AccountRepository;

  public handle(event: AccountOpenedEvent): Promise<Account> {
    const account: Account = new Account();

    account.id = event.id;
    account.holder = event.holder;
    account.type = event.type;
    account.email = event.email;
    account.createdDate = event.createdDate;

    return this.repository.save(account);
  }
}
