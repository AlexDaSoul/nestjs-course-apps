import {
  Logger,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { createCertificate } from 'pem';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as manager from 'amqp-connection-manager';
import { PkiResponse } from '@jws/jws.interfaces';

const serviceKey = readFileSync(
  resolve(process.cwd(), 'libs/jws/src/pki/dev.pem'),
).toString('utf-8');

@Injectable()
export class PemCertService implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(PemCertService.name);
  private channel: any;

  constructor(
    @Inject(process.env.RMQ_AUTH_SERVICE) private readonly client: ClientRMQ,
  ) {
  }

  async onApplicationBootstrap() {
    this.channel = await this.client.connect();
    /*    const connect = await manager.connect(`${ process.env.RMQ_HOST }:${ process.env.RMQ_PORT }`);
        this.channel = connect.createChannel({
          json: true,
          setup: c => c.assertQueue(process.env.RMQ_AUTH_QUEUE, { durable: true }),
        });

        this.channel.publish(process.env.RMQ_AUTH_QUEUE, {hello: 'world'})
          .then(function() {
            return console.log("Message was sent!  Hooray!");
          }).catch(function(err) {
          return console.log(err);
        });*/


/*
*
* */



    /*    this.channel.consume(process.env.RMQ_AUTH_SERVICE)
          .then(function() {
            return console.log("Message was sent!  Hooray!");
          }).catch(function(err) {
          return console.log(err);
        });*/
    // console.log(this.channel);
  }

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
    this.channel.on('error', err => {
      this.logger.error(err.message);
    });

    /*    this.channel.request('getPkiKeys', (keys: PkiResponse) => {
          this.logger.debug('getPkiKeys request');

          process.env.JWT_PUB = keys.JWT_PUB;
          process.env.JWT_PRIV = keys.JWT_PRIV;
        });*/

    /*    this.channel.subscribe('getPkiKeys', (keys: PkiResponse) => {
          this.logger.debug('getPkiKeys subscribe');

          process.env.JWT_PUB = keys.JWT_PUB;
          process.env.JWT_PRIV = keys.JWT_PRIV;
        });*/
  }

  public setKeys(keys: PkiResponse): void {
    this.client['publish']({
      pattern: 'setPemPublicKey',
      data: {
        JWT_PUB: keys.JWT_PUB,
        JWT_PRIV: keys.JWT_PRIV,
      },
    }, (packet) => {
      console.log(packet);
    });


    /*    this.channel.subscribe('getPkiKeys', (msg: PkiResponse, reply: string) => {
          if (reply) {
            this.channel.publish(reply, {
              JWT_PUB: keys.JWT_PUB,
              JWT_PRIV: keys.JWT_PRIV,
            });
          }
        });*/
  }
}
