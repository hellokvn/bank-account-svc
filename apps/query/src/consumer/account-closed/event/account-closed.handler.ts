import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AccountClosedEvent } from '@shared/events';
import { AccountRepository } from '@query/common/repository/account.repository';
import { Account } from '@query/common/entity/account.entity';

@EventsHandler(AccountClosedEvent)
export class AccountClosedHandler implements IEventHandler<AccountClosedEvent> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async handle(event: AccountClosedEvent) {
    const account: Account = await this.repository.findOne(event.id);

    if (!account) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(account.id, { isActive: false });
  }
}
