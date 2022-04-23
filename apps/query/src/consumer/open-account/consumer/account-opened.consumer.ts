import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { AccountOpenedEvent } from '@shared/events';

@Controller()
export class AccountConsumer implements OnApplicationBootstrap {
  @Inject('HERO_SERVICE')
  public readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public async onApplicationBootstrap() {
    this.client.subscribeToResponseOf(AccountOpenedEvent.constructor.name);
    this.client.connect();
  }

  @MessagePattern(AccountOpenedEvent.constructor.name)
  private consume(@Payload() { value }: KafkaMessage): void {
    const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, value);

    this.eventBus.publish(event);
  }
}
