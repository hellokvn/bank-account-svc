import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../common/entity/account.entity';
import { AccountRepository } from '../../common/repository/account.repository';

@Injectable()
export class AccountHandler {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  @OnEvent('AccountOpenedEvent')
  private handleOrderCreatedEvent(event: any): void {
    // handle and process "OrderCreatedEvent" event
    console.log('onevent', event);

    const account: Account = new Account();

    account.holder = event.accountHolder;
    account.type = event.accountType;
    account.balance = event.openingBalance;
    account.createdDate = event.createdDate;

    this.repository.save(account);
  }
}
