import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventSourcingModule } from 'nest-event-sourcing';
import { DepositFundsModule } from './deposit-funds/deposit-funds.module';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventSourcingModule.forRoot({ mongoUrl: 'mongodb://localhost:27017/bankAccount' }),
    OpenAccountModule,
    DepositFundsModule,
  ],
})
export class AppModule {}
