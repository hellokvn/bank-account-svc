import { CloseAccountDto } from '../controllers/close-account.dto';

export class CloseAccountCommand {
  private readonly id: string;

  constructor({ id }: CloseAccountDto) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}
