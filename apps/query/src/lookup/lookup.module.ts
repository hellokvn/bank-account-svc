import { Module } from '@nestjs/common';

import { FindAccountModule } from './find-account/find-account.module';
import { FindAllAccountsModule } from './find-all-accounts/find-all-accounts.module';

@Module({
  imports: [FindAllAccountsModule, FindAccountModule],
})
export class LookupModule {}
