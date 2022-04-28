import { Module } from '@nestjs/common';

import { AccountClosedModule } from './account-closed/account-closed.module';
import { AccountOpenedModule } from './account-opened/account-opened.module';

@Module({ imports: [AccountOpenedModule, AccountClosedModule] })
export class ConsumerModule {}
