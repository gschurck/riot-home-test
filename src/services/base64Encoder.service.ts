import {Service} from 'typedi';
import {EncryptionAlgorithmInterface} from "@interfaces/encryptionAlgorithm.interface";

@Service()
export class Base64Encoder implements EncryptionAlgorithmInterface {
  encrypt(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  decrypt(data: string): string {
    return Buffer.from(data, 'base64').toString('utf8');
  }
}
