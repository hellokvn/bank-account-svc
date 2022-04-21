import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OpenAccountController } from './controllers/open-account.controller';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { OpenAccountHandler } from './commands/open-account.handler';
import { AccountEventProducer } from '../common/account-event.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BANK_ACCOUNT_COMMAND_PACKAGE_NAME } from '@command/common/proto/bank-account-command.pb';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
    //     transport: Transport.GRPC,
    //     options: {
    //       package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
    //       protoPath: join('node_modules/bank-shared-proto/proto/bank-account-command.proto'),
    //     },
    //   },
    // ]),
    CqrsModule,
  ],
  controllers: [OpenAccountController],
  providers: [OpenAccountHandler, AccountOpenedHandler, AccountEventProducer, EventSourcingHandler],
})
export class OpenAccountModule {}
