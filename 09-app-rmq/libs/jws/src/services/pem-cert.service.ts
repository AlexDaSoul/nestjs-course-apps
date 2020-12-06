import { Logger, Injectable } from '@nestjs/common';
import { createCertificate } from 'pem';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from 'redis';
import { PkiResponse } from '@jws/jws.interfaces';

const publisher = createClient(
  `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);

const subscriber = createClient(
  `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);

const serviceKey = readFileSync(
  resolve(process.cwd(), 'libs/jws/src/pki/dev.pem'),
).toString('utf-8');

const PATTERN = 'pkiKeys';

@Injectable()
export class PemCertService {
  private readonly logger: Logger = new Logger(PemCertService.name);

  public async createCertificate(): Promise<PkiResponse> {
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
    const keys = JSON.parse(subscriber.get(PATTERN));

    process.env.JWT_PUB = keys.JWT_PUB;
    process.env.JWT_PRIV = keys.JWT_PRIV;

    this.logger.debug(`${PATTERN} get keys`);

    subscriber.on('message', (channel, message) => {
      if (channel === PATTERN) {
        const newKeys = JSON.parse(message);

        process.env.JWT_PUB = newKeys.JWT_PUB;
        process.env.JWT_PRIV = newKeys.JWT_PRIV;

        this.logger.debug(`${PATTERN} update`);
      }
    });

    subscriber.subscribe(PATTERN, () => {
      this.logger.debug(`${PATTERN} subscribe`);
    });

    subscriber.on('error', err => {
      this.logger.error(err.message);
    });
  }

  public setKeys(keys: PkiResponse): void {
    publisher.set(PATTERN, JSON.stringify(keys));
    publisher.publish(PATTERN, JSON.stringify(keys));

    this.logger.debug(`${PATTERN} set keys`);
  }
}
