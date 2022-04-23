import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../common/repository/account.repository';
import { Account } from '../../../common/entity/account.entity';
import { AccountClosedEvent } from '@shared/events';
import { HttpException, HttpStatus } from '@nestjs/common';

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
