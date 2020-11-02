import { Injectable } from '@nestjs/common';
import { createCertificate } from 'pem';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const serviceKey = readFileSync(
  resolve(process.cwd(), 'src/jws/pki/dev.pem'),
).toString('utf-8');

@Injectable()
export class PemCertService {
  public async createCertificate(): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
      createCertificate(
        { serviceKey: process.env.DEVELOPMENT ? serviceKey : null },
        (err, keys) => {
          if (err) {
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
}
