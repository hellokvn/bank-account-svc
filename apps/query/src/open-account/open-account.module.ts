import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from '../common/repository/account.repository';
import { AccountConsumer } from './consumer/account.consumer';
import { AccountController } from './controller/account.controller';
import { AccountOpenedHandler } from './event/account-opened.handler';
import { AccountHandler } from './event/account.handler';
import { AllAccountsHandler } from './query/all-accounts.handler';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-app',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test-group',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountController, AccountConsumer],
  providers: [AccountOpenedHandler, AccountHandler, AllAccountsHandler],
})
export class OpenAccountModule {}
