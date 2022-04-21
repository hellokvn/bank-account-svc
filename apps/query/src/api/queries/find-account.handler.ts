import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../common/repository/account.repository';
import { FindAccountDto } from '../dto/find-account.dto';
import { FindAccountQuery } from './find-account.query';
import { Account } from '../../common/entity/account.entity';

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements IQueryHandler<FindAccountQuery> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  async execute({ id }: FindAccountQuery): Promise<Account> {
    console.log('FindAccountQueryHandler/execute', { id });
    return this.repository.findOne(id);
  }
}
