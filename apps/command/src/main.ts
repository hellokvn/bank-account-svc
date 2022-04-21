import { Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { BANK_ACCOUNT_COMMAND_PACKAGE_NAME } from './common/proto/bank-account-command.pb';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();
  const port: number = 3004;

  await configure(app, config);

  await app.listen(port, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[PRT] ${port}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: config.get('COMMAND_GRPC_URL'),
      package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
      protoPath: 'node_modules/bank-shared-proto/proto/bank-account-command.proto',
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
