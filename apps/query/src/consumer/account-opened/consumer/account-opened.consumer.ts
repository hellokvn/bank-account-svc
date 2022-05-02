import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { AccountOpenedEvent } from '@shared/events';

@Controller()
export class AccountOpenedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('AccountOpenedEvent')
  private consume(@Payload() { value }: KafkaMessage): void {
    const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, value);

    this.eventBus.publish(event);
  }
}
