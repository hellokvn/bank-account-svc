import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DepositFundCommand } from '../commands/deposit-funds.command';
import { DepositFundsDto } from './deposit-funds.dto';

@Controller('/api/v1/deposit-funds')
export class DepositFundsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('/:id')
  public async depositFunds(@Param('id') id: string, @Body() payload: DepositFundsDto): Promise<any> {
    const command: DepositFundCommand = new DepositFundCommand(id, payload);

    this.commandBus.execute(command);
  }
}
