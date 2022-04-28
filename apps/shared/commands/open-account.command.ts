import { v4 as uuidv4 } from 'uuid';

import { OpenAccountDto } from '@command/open-account/controllers/open-account.dto';
import { AccountType } from '../enums/account-type.enum';

export class OpenAccountCommand {
  private readonly id: string;
  private holder: string;
  private email: string;
  private type: AccountType;
  private openingBalance: number;

  constructor(payload: OpenAccountDto) {
    this.id = uuidv4();
    this.holder = payload.holder;
    this.email = payload.email;
    this.type = payload.type;
    this.openingBalance = payload.openingBalance;
  }

  public getId(): string {
    return this.id;
  }

  public getHolder(): string {
    return this.holder;
  }

  public setHolder(holder: string): void {
    this.holder = holder;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getType(): AccountType {
    return this.type;
  }

  public setType(type: AccountType): void {
    this.type = type;
  }

  public getOpeningBalance(): number {
    return this.openingBalance;
  }

  public setOpeningBalance(openingBalance: number): void {
    this.openingBalance = openingBalance;
  }
}
