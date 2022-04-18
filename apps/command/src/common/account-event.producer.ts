import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class AccountEventProducer {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app2',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.producer.connect(); // TODO: need?
  }

  public produce<T>(topic: string, event: T): void {
    console.log('AccountEventProducer/produce', topic);
    this.producer.send({ topic: 'test-topicc', messages: [{ value: JSON.stringify(event) }] });
  }
}
