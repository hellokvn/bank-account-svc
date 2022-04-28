import { EntityRepository, Repository } from 'typeorm';

import { Account } from '../entity/account.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {}
