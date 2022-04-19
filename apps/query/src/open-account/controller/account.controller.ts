import { Controller, OnModuleInit, Get, Body } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AllAccountsQuery } from '../query/all-accounts.query';

@Controller('/api/v1/lookup/account')
export class AccountController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  public getAllAccounts(): Promise<any> {
    const query: AllAccountsQuery = new AllAccountsQuery();

    return this.queryBus.execute(query);
  }
}
