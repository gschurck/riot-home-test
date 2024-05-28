import {Service} from 'typedi';
import {SignatureAlgorithmInterface} from "@interfaces/signatureAlgorithmInterface";

import {createHmac} from "crypto"
import {SECRET_KEY} from "@config";

@Service()
export class Sha256Signer implements SignatureAlgorithmInterface {
  sign(data: string): string {
    const hmac = createHmac('sha256', SECRET_KEY);
    const signature = hmac.update(data).digest('hex');
    return signature;
  }
}
