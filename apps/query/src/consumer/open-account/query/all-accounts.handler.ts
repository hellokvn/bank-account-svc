import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../common/repository/account.repository';
import { AllAccountsQuery } from './all-accounts.query';

@QueryHandler(AllAccountsQuery)
export class AllAccountsHandler implements IQueryHandler<AllAccountsQuery> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async execute(query: AllAccountsQuery) {
    console.log('AllAccountsHandler/execute');
    return this.repository.find();
  }
}
