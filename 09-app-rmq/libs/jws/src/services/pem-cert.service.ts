import {
  Logger,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { createCertificate } from 'pem';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { PkiResponse } from '@jws/jws.interfaces';

const serviceKey = readFileSync(
  resolve(process.cwd(), 'libs/jws/src/pki/dev.pem'),
).toString('utf-8');

@Injectable()
export class PemCertService implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(PemCertService.name);
  private connect: any;

  constructor(
    @Inject(process.env.NATS_AUTH_SERVICE) private readonly client: ClientNats,
  ) {}

  async onApplicationBootstrap() {
    this.connect = await this.client.connect();
  }

  public async createCertificate(): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
      createCertificate(
        { serviceKey: process.env.DEVELOPMENT ? serviceKey : null },
        (err, keys) => {
          if (err) {
            this.logger.error(err);
            reject(err);
          } else {
            resolve({
              JWT_PUB: keys.certificate,
              JWT_PRIV: keys.serviceKey,
            });
          }
        },
      );
    });
  }

  public getKeys(): void {
    this.connect.on('error', err => {
      this.logger.error(err.message);
    });

    this.connect.request('getPkiKeys', (keys: PkiResponse) => {
      this.logger.debug('getPkiKeys request');

      process.env.JWT_PUB = keys.JWT_PUB;
      process.env.JWT_PRIV = keys.JWT_PRIV;
    });

    this.connect.subscribe('getPkiKeys', (keys: PkiResponse) => {
      this.logger.debug('getPkiKeys subscribe');

      process.env.JWT_PUB = keys.JWT_PUB;
      process.env.JWT_PRIV = keys.JWT_PRIV;
    });
  }

  public setKeys(keys: PkiResponse): void {
    this.connect.publish('getPkiKeys', {
      JWT_PUB: keys.JWT_PUB,
      JWT_PRIV: keys.JWT_PRIV,
    });

    this.connect.subscribe('getPkiKeys', (msg: PkiResponse, reply: string) => {
      if (reply) {
        this.connect.publish(reply, {
          JWT_PUB: keys.JWT_PUB,
          JWT_PRIV: keys.JWT_PRIV,
        });
      }
    });
  }
}
