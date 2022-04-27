import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from '@shared/filter/http-exception.filter';
import { AppModule } from './app.module';
import { BANK_ACCOUNT_QUERY_PACKAGE_NAME } from './common/proto/bank-account-query.pb';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();

  await configure(app, config);

  await app.listen(undefined, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[URL] ${config.get('QUERY_GRPC_URL')}`);
    logger.log(`[BKR] ${config.get('QUERY_KAFKA_URL')}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('QUERY_GRPC_URL'),
        package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
        protoPath: 'node_modules/bank-shared-proto/proto/bank-account-query.proto',
      },
    },
    { inheritAppConfig: true },
  );

  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'bank-account-client',
          brokers: [config.get('KAFKA_URL')],
        },
        consumer: {
          groupId: 'bank-account-svc',
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
