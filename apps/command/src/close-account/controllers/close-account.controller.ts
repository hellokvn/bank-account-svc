import { Body, Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CloseAccountDto } from './close-account.dto';
import { CloseAccountCommand } from '../commands/close-account.command';
import { BANK_ACCOUNT_COMMAND_SERVICE_NAME } from '@command/common/proto/bank-account-command.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class CloseAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_ACCOUNT_COMMAND_SERVICE_NAME, 'CloseAccount')
  public async openAccount(@Body() payload: CloseAccountDto): Promise<any> {
    const command: CloseAccountCommand = new CloseAccountCommand(payload);

    await this.commandBus.execute(command);

    return { id: command.getId() };
  }
}
