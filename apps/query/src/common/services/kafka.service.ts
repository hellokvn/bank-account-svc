import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService implements ClientsModuleOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createClientOptions(): ClientProvider {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'my-app',
          brokers: [this.config.get('KAFKA_URL')],
        },
        consumer: {
          groupId: 'test-group',
        },
      },
    };
  }
}
