import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../common/repository/account.repository';
import { Account } from '../../../common/entity/account.entity';
import { AccountOpenedEvent } from '@shared/events';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async handle(event: AccountOpenedEvent) {
    console.log('AccountOpenedHandler/handle', { event });
    const account: Account = new Account();

    account.id = event.id;
    account.holder = event.holder;
    account.type = event.type;
    account.email = event.email;
    account.balance = event.openingBalance;
    account.createdDate = event.createdDate;

    console.log({ account });

    this.repository.save(account);
  }
}
