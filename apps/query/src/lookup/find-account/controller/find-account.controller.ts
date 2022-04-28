import { Controller, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';

import { Account } from '@query/common/entity/account.entity';
import { BANK_ACCOUNT_QUERY_SERVICE_NAME, FindAccountResponse } from '@query/common/proto/bank-account-query.pb';
import { FindAccountDto } from './find-account.dto';
import { FindAccountQuery } from '../query/find-account.query';

@Controller()
export class FindAccountController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(BANK_ACCOUNT_QUERY_SERVICE_NAME, 'FindAccount')
  private async findAccount(@Payload() payload: FindAccountDto): Promise<FindAccountResponse> {
    const query: FindAccountQuery = new FindAccountQuery(payload);
    const data: Account = await this.queryBus.execute(query);

    if (!data) {
      throw new HttpException('No account found!', HttpStatus.NO_CONTENT);
    }

    return { data, status: HttpStatus.OK, error: null };
  }
}
