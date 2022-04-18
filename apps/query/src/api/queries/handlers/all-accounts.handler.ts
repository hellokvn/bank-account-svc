import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../domain/repository/account.repository';
import { AllAccountsQuery } from '../impl/all-accounts.query';

@QueryHandler(AllAccountsQuery)
export class AllAccountsHandler implements IQueryHandler<AllAccountsQuery> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async execute(query: AllAccountsQuery) {
    return this.repository.find();
  }
}
