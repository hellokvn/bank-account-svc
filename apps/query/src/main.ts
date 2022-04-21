import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { BANK_ACCOUNT_QUERY_PACKAGE_NAME } from './proto/bank-account-query.pb';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();
  const port: number = 3001;

  await configure(app, config);

  await app.listen(null);
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: config.get('QUERY_GRPC_URL'),
      package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
      protoPath: join('node_modules/bank-shared-proto/proto/bank-account-query.proto'),
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: [config.get('QUERY_KAFKA_URL')],
  //     },
  //   },
  // });

  await app.startAllMicroservices();
}

bootstrap();
