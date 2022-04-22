import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService implements ClientsModuleOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createClientOptions(): ClientProvider {
    return {
      options: {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-app',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test-group',
          },
        },
      },
    };
  }
}
