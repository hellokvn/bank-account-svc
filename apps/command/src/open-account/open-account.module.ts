import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OpenAccountController } from './controllers/open-account.controller';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { OpenAccountHandler } from './commands/open-account.handler';
import { OpenAccountSaga } from './sagas/open-account.saga';
import { AccountEventProducer } from '../common/producer/account-event.producer';
import { BANK_FUNDS_COMMAND_PACKAGE_NAME } from '@command/common/proto/bank-funds-command.pb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@command/common/proto/bank-funds-query.pb';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: BANK_FUNDS_QUERY_SERVICE_NAME,
        imports: [ConfigModule], //  TODO: rm
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('BANK_FUNDS_COMMAND_GRPC_URL'), // TODO: replace
            package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
            protoPath: 'node_modules/bank-shared-proto/proto/bank-funds-command.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler, OpenAccountSaga],
})
export class OpenAccountModule {}
