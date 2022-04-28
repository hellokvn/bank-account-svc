import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';

import {
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  FindAllAccountsResponse,
  FindAllAccountsResponseData,
} from '@query/common/proto/bank-account-query.pb';
import { FindAllAccountsDto } from './find-all-accounts.dto';
import { FindAllAccountsQuery } from '../query/find-all-accounts.query';

@Controller()
export class FindAllAccountsController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(BANK_ACCOUNT_QUERY_SERVICE_NAME, 'FindAllAccounts')
  private async findAllAccounts(@Payload() payload: FindAllAccountsDto): Promise<FindAllAccountsResponse> {
    const query: FindAllAccountsQuery = new FindAllAccountsQuery(payload);
    const data: FindAllAccountsResponseData = await this.queryBus.execute(query);

    return { data, status: HttpStatus.OK, error: null };
  }
}
