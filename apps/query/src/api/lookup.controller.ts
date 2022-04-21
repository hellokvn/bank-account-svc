import { Body, Controller, Inject, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from '@query/common/entity/account.entity';
import { BANK_ACCOUNT_QUERY_SERVICE_NAME, FindAccountResponse } from '../proto/bank-account-query.pb';
import { FindAccountDto } from './dto/find-account.dto';
import { FindAccountQuery } from './queries/find-account.query';

@Controller()
export class LookupController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(BANK_ACCOUNT_QUERY_SERVICE_NAME, 'FindAccount')
  private async findAccount(payload: FindAccountDto): Promise<FindAccountResponse> {
    console.log('find account', { payload });
    const query: FindAccountQuery = new FindAccountQuery();

    query.id = payload.id;

    const account: Account = await this.queryBus.execute(query);

    if (!account) {
    }
    console.log({ account });
    return { status: 200, error: [], id: payload.id };
  }

  // @GrpcMethod('HeroesService', 'FindOne')
  // findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any>): Hero {
  //   const items = [
  //     { id: 1, name: 'John' },
  //     { id: 2, name: 'Doe' },
  //   ];
  //   return items.find(({ id }) => id === data.id);
  // }

  // @Post()
  // public async findAllAccounts(@Body() body: FindAllAcountsDto): Promise<any> {
  //   return {};
  // }
}
