import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';

async function bootstrap() {
  const app = await NestFactory.create(QueryModule);
  await app.listen(3003);
  console.log('running 3003');
}
bootstrap();
