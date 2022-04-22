import { CloseAccountDto } from '../controllers/close-account.dto';

export class CloseAccountCommand {
  public id: string;

  constructor(command: CloseAccountDto) {
    this.id = command.id;
  }
}
