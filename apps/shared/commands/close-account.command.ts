import { CloseAccountDto } from '@command/close-account/controllers/close-account.dto';

export class CloseAccountCommand {
  public id: string;

  constructor(payload: CloseAccountDto) {
    this.id = payload.id;
  }
}
