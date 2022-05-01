import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable, map, firstValueFrom, delay } from 'rxjs';

import { AccountOpenedEvent } from '@shared/events';
import {
  BankFundsCommandServiceClient,
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  DepositFundsRequest,
  DepositFundsResponse,
} from '@command/common/proto/bank-funds-command.pb';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@command/common/proto/bank-funds-query.pb';

@Injectable()
export class OpenAccountSaga implements OnModuleInit {
  @Inject(BANK_FUNDS_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private bankFundsCommandService: BankFundsCommandServiceClient;

  public onModuleInit() {
    this.bankFundsCommandService = this.client.getService<BankFundsCommandServiceClient>(BANK_FUNDS_COMMAND_SERVICE_NAME);
  }

  @Saga()
  private onEvent(events$: Observable<AccountOpenedEvent>): Observable<ICommand> {
    const apply = map((event: AccountOpenedEvent) => {
      this.onAcountOpenedEvent(event);
      return null;
    });

    return <Observable<ICommand>>events$.pipe(ofType(AccountOpenedEvent), delay(1000), apply);
  }

  private async onAcountOpenedEvent(event: AccountOpenedEvent): Promise<void> {
    console.log('OpenAccountSaga/accountOpened', { event });
    const req: DepositFundsRequest = { id: event.id, amount: event.openingBalance };
    const res: DepositFundsResponse = await firstValueFrom(this.bankFundsCommandService.depositFunds(req));

    console.log({ req, res });
  }
}
