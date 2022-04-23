import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { BaseEvent } from 'nest-event-sourcing';

@Injectable()
export class AccountEventProducer {
  private producer: Producer;

  constructor() {
    const kafka: Kafka = new Kafka({
      clientId: 'my-app2',
      brokers: ['localhost:9092'],
    });

    this.producer = kafka.producer();
    this.producer.connect();
  }

  public produce<T extends BaseEvent>(topic: string, event: T): void {
    console.log('produce', topic);
    this.producer.send({ topic: topic, messages: [{ value: JSON.stringify(event) }] });
  }
}
