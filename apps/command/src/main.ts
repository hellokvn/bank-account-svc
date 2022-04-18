import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  await app.listen(3002);
  console.log('running 3002');
}
bootstrap();
