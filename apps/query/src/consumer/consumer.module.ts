import { Module } from '@nestjs/common';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({ imports: [OpenAccountModule] })
export class ConsumerModule {}
