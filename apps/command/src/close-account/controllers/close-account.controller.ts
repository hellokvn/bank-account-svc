import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { BANK_ACCOUNT_COMMAND_SERVICE_NAME, CloseAccountResponse } from '@command/common/proto/bank-account-command.pb';
import { CloseAccountCommand } from '@shared/commands/close-account.command';
import { CloseAccountDto } from './close-account.dto';

@Controller()
export class CloseAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_ACCOUNT_COMMAND_SERVICE_NAME, 'CloseAccount')
  private async openAccount(@Body() payload: CloseAccountDto): Promise<CloseAccountResponse> {
    const command: CloseAccountCommand = new CloseAccountCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
