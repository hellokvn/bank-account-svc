import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './common/entity/account.entity';
import { OpenAccountModule } from './open-account/open-account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kevin',
      database: 'account',
      entities: [Account],
      synchronize: false,
    }),
    OpenAccountModule,
  ],
})
export class AppModule {}
