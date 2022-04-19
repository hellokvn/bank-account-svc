import { v4 as uuidv4 } from 'uuid';
import { OpenAccountDto } from '../controllers/open-account.dto';
import { AccountType } from '../../common/enums/account-type.enum';

export class OpenAccountCommand {
  private readonly id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private type: AccountType;
  private openingBalance: number;

  constructor(payload: OpenAccountDto) {
    this.id = uuidv4();
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.type = payload.type;
    this.openingBalance = payload.openingBalance;
  }

  public getId(): string {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
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
