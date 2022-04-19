import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { AccountOpenedEvent } from '../event/account-opened.event';

@Controller()
export class AccountConsumer implements OnApplicationBootstrap {
  @Inject('HERO_SERVICE')
  public client: ClientKafka;

  @Inject(EventBus)
  private eventBus: EventBus;

  public async onApplicationBootstrap() {
    this.client.subscribeToResponseOf('test-topicc');
    this.client.connect();
  }

  @MessagePattern('test-topicc')
  public consume(@Payload() payload: any): any {
    console.log('@@@@@@@@@@@@@@EEEE AccountOpenedEvent', { payload });
    const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, payload.value);
    this.eventBus.publish(event);
  }
}
