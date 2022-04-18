import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenAccountCommand } from './open-account.command';
import { OpenAccountDto } from './open-account.dto';

@Controller('/api/v1/open-account')
export class OpenAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @Post()
  public async openAccount(@Body() payload: OpenAccountDto): Promise<any> {
    console.log('-----------------------------');
    console.log('AccountController/openAccount');
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    this.commandBus.execute(command);

    return { id: command.getId() };
  }
}
