import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { AccountOpenedEvent } from '@shared/events';

@Controller()
export class AccountOpenedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('AccountOpenedEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('AccountOpenedEvent')
  private consume(@Payload() { value }: KafkaMessage): void {
    console.log('AccountOpenedEvent consume --------------');
    const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, value);

    this.eventBus.publish(event);
  }
}
