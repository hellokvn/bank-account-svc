import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

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

  public produce<T>(topic: string, event: T): void {
    this.producer.send({ topic: 'test-topicc', messages: [{ value: JSON.stringify(event) }] });
  }
}
