import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { AccountClosedEvent } from '@shared/events';

@Controller()
export class AccountConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('AccountClosedEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('AccountClosedEvent')
  private consume(@Payload() { value }: KafkaMessage): void {
    const event: AccountClosedEvent = plainToClass(AccountClosedEvent, value);

    this.eventBus.publish(event);
  }
}
