import {
  BankFundsCommandServiceClient,
  BANK_FUNDS_COMMAND_PACKAGE_NAME,
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  DepositFundsRequest,
  DepositFundsResponse,
} from '@command/common/proto/bank-funds-command.pb';
import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { AccountOpenedEvent } from '@shared/events';
import { Observable, map, firstValueFrom, delay } from 'rxjs';

@Injectable()
export class OpenAccountSaga implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50054',
      package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
      protoPath: 'node_modules/bank-shared-proto/proto/bank-funds-command.proto',
    },
  })
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
