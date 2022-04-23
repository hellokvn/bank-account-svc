import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.config.get('QUERY_DB_URL'),
      entities: [Account],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: true,
      synchronize: true,
      logging: false,
    };
  }
}
