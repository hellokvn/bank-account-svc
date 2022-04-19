import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenAccountDto } from './open-account.dto';
import { OpenAccountCommand } from '../commands/open-account.command';

@Controller('/api/v1/open-account')
export class OpenAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @Post()
  public async openAccount(@Body() payload: OpenAccountDto): Promise<any> {
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    this.commandBus.execute(command);

    return { id: command.getId() };
  }
}
