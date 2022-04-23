import { INestApplication, Logger, NestHybridApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from '@shared/filter/http-exception.filter';
import { join } from 'path';
import { AppModule } from './app.module';
import { BANK_ACCOUNT_QUERY_PACKAGE_NAME } from './proto/bank-account-query.pb';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();
  const port: number = 3001;

  await configure(app, config);

  await app.listen(undefined, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[URL] ${config.get('QUERY_GRPC_URL')}`);
    logger.log(`[BKR] ${config.get('QUERY_KAFKA_URL')}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  const inherit: NestHybridApplicationOptions = { inheritAppConfig: true };

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: config.get('QUERY_GRPC_URL'),
      package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
      protoPath: join('node_modules/bank-shared-proto/proto/bank-account-query.proto'),
    },
    inherit,
  });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [config.get('QUERY_KAFKA_URL')],
      },
    },
    inherit,
  });

  await app.startAllMicroservices();
}

bootstrap();
