import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaConfigService } from '@query/common/services/kafka.service';
import { BANK_ACCOUNT_QUERY_SERVICE_NAME } from '@query/proto/bank-account-query.pb';
import { AccountRepository } from '../../common/repository/account.repository';
import { AccountConsumer } from './consumer/account-opened.consumer';
import { AccountOpenedHandler } from './event/account-opened.handler';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    ClientsModule.registerAsync([{ name: BANK_ACCOUNT_QUERY_SERVICE_NAME, useClass: KafkaConfigService }]),

    // ClientsModule.registerAsync([
    //   {
    //     name: 'HERO_SERVICE',
    //     inject: [ConfigModule],
    //     useFactory: async (config: ConfigService) => ({
    //       name: 'HERO_SERVICE',
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: 'my-app',
    //           brokers: ['localhost:9092'],
    //         },
    //         consumer: {
    //           groupId: 'test-group',
    //         },
    //       },
    //     }),
    //   },
    // ]),
    // ClientsModule.register([
    //   {
    //     name: 'HERO_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'my-app',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'test-group',
    //       },
    //     },
    //   },
    // ]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountConsumer],
  providers: [AccountOpenedHandler],
})
export class OpenAccountModule {}
