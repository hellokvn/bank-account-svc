import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'nest-event-sourcing';
import { DepositFundsModule } from './deposit-funds/deposit-funds.module';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({
  imports: [
    EventSourcingModule.forRoot({ mongoUrl: 'mongodb://localhost:27017/bankAccount' }),
    CqrsModule,
    OpenAccountModule,
    DepositFundsModule,
  ],
})
export class AppModule {}
