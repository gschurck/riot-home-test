import {Inject, Service} from 'typedi';
import {EncryptionAlgorithmInterface} from "@interfaces/encryptionAlgorithm.interface";
import {Base64Encoder} from "@services/base64Encoder.service";
import {isObject} from "@utils/typeChecking";

@Service()
export class CryptographyService {

  constructor(
    @Inject(() => Base64Encoder)
    private encryptor: EncryptionAlgorithmInterface
  ) {
  }

  public async encryptObjectValues(object: stringsAndObjectsPayload): Promise<stringsPayload> {
    const encryptedObject = {};
    for (const key in object) {
      let value = object[key];
      if (isObject(value)) {
        value = JSON.stringify(value);
      }
      const stringValue = value.toString();
      encryptedObject[key] = this.encryptor.encrypt(stringValue);
    }
    return encryptedObject;
  }

  public async decryptObjectValues(object: stringsPayload): Promise<stringsAndObjectsPayload> {
    const decryptedObject = {};
    for (const key in object) {
      let decryptedValue = this.encryptor.decrypt(object[key]);

      try {
        decryptedObject[key] = JSON.parse(decryptedValue);
      } catch (error) {
        decryptedObject[key] = decryptedValue;
      }
    }
    return decryptedObject;
  }
}
