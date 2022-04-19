import { Body, Controller, Inject, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllAcountsDto } from './dto/find-all-accounts.dto';

@Controller('/api/v1/open-account')
export class OpenAccountController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @Post()
  public async findAllAccounts(@Body() body: FindAllAcountsDto): Promise<any> {
    return {};
  }
}
