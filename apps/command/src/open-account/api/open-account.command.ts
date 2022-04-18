import { v4 as uuidv4 } from 'uuid';
import { OpenAccountDto } from './open-account.dto';

export class OpenAccountCommand {
  private id: string;
  private accountHolder: string;
  private accountType: string;
  private openingBalance: number;

  constructor(payload: OpenAccountDto) {
    this.id = uuidv4();
    this.accountHolder = payload.accountHolder;
    this.accountType = payload.accountType;
    this.openingBalance = payload.openingBalance;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getAccountType(): string {
    return this.accountType;
  }

  public setAccountType(value: string) {
    this.accountType = value;
  }

  public getAccountHolder(): string {
    return this.accountHolder;
  }

  public setAccountHolder(value: string) {
    this.accountHolder = value;
  }

  public getOpeningBalance(): number {
    return this.openingBalance;
  }

  public setOpeningBalance(value: number) {
    this.openingBalance = value;
  }
}
