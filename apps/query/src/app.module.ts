import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './api/controller/account.controller';
import { AllAccountsHandler } from './api/queries/handlers/all-accounts.handler';
import { Account } from './domain/entity/account.entity';
import { AccountRepository } from './domain/repository/account.repository';
import { AccountConsumer } from './infrastructure/consumers/account.consumer';
import { AccountHandler } from './infrastructure/handlers/account.handler';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kevin',
      database: 'account',
      entities: [Account],
      synchronize: false,
    }),
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
    OpenAccountModule,
  ],
  controllers: [AccountController, AccountConsumer],
  providers: [AccountHandler, AllAccountsHandler],
})
export class AppModule {}
