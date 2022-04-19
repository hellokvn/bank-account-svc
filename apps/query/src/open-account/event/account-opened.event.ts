import { BaseEvent } from 'nest-event-sourcing';

export class AccountOpenedEvent extends BaseEvent {
  public accountHolder: string;
  public accountType: string;
  public openingBalance: number;
  public createdDate: Date;

  constructor() {
    super();
    console.log('AccountOpenedEvent/constructor');
  }
}
