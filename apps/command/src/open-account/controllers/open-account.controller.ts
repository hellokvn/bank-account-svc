import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenAccountDto } from './open-account.dto';
import { OpenAccountCommand } from '../commands/open-account.command';
import { BANK_ACCOUNT_COMMAND_SERVICE_NAME } from '@command/common/proto/bank-account-command.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OpenAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_ACCOUNT_COMMAND_SERVICE_NAME, 'OpenAccount')
  public async openAccount(@Body() payload: OpenAccountDto): Promise<any> {
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    await this.commandBus.execute(command);

    return { id: command.getId() };
  }
}
