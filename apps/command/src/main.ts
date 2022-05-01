import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { HttpExceptionFilter } from '@shared/filter/http-exception.filter';
import { AppModule } from './app.module';
import { BANK_ACCOUNT_COMMAND_PACKAGE_NAME } from './common/proto/bank-account-command.pb';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();

  await configure(app, config);

  app.listen(undefined, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[DKR] ${process.env.IS_DOCKER ? true : false}`);
    logger.log(`[KFK] ${config.get('KAFKA_URL')}`);
    logger.log(`[URL] ${config.get('COMMAND_GRPC_URL')}`);
  });
}

// TODO: is hybrid necessasry? Problably not.
async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('COMMAND_GRPC_URL'),
        package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
        protoPath: 'node_modules/bank-shared-proto/proto/bank-account-command.proto',
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
