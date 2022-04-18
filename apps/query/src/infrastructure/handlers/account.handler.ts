import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../domain/repository/account.repository';
import { Account } from '../../domain/entity/account.entity';

@Injectable()
export class AccountHandler {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  @OnEvent('AccountOpenedEvent')
  private handleOrderCreatedEvent(event: any): void {
    // handle and process "OrderCreatedEvent" event
    console.log(event);

    const account: Account = new Account();

    account.holder = event.accountHolder;
    account.type = event.accountType;
    account.balance = event.openingBalance;
    account.createdDate = event.createdDate;

    this.repository.save(account);
  }
}
