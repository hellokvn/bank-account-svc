import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import {
  Account,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  FindAllAccountsResponse,
  FindAllAccountsResponseData,
} from '@query/proto/bank-account-query.pb';
import { FindAllAccountsQuery } from '../query/find-all-accounts.query';
import { FindAllAccountsDto } from './find-all-accounts.dto';

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
