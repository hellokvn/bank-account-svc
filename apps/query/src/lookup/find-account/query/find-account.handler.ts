import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from '@query/common/entity/account.entity';
import { AccountRepository } from '@query/common/repository/account.repository';
import { FindAccountQuery } from './find-account.query';

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements ICommandHandler<FindAccountQuery> {
  @InjectRepository(AccountRepository)
  private readonly repository: AccountRepository;

  public execute(query: FindAccountQuery): Promise<Account> {
    return this.repository.findOne(query.id);
  }
}
