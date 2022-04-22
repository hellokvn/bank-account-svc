import { Controller, Get, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AllAccountsQuery } from '../query/all-accounts.query';

@Controller('/api/v1/lookup/account')
export class AccountController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @Get()
  private getAllAccounts(): Promise<any> {
    const query: AllAccountsQuery = new AllAccountsQuery();

    return this.queryBus.execute(query);
  }
}
