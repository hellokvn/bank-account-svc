import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaConfigService } from '@query/common/services/kafka.service';
import { AccountRepository } from '../../common/repository/account.repository';
import { AccountConsumer } from './consumer/account-opened.consumer';
import { AccountOpenedHandler } from './event/account-opened.handler';
import { AllAccountsHandler } from './query/all-accounts.handler';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    ClientsModule.registerAsync([{ name: 'HERO_SERVICE', useClass: KafkaConfigService }]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountConsumer],
  providers: [AccountOpenedHandler, AllAccountsHandler],
})
export class OpenAccountModule {}
