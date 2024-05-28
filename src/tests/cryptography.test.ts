import request from 'supertest';
import {App} from '@/app';
import {CryptographyRoute} from "@routes/cryptography.route";

// Tests made with SECRET_KEY = secretKey

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Cryptography API', () => {
  const route = new CryptographyRoute();
  const app = new App([route]);

  describe('[POST] /encrypt', () => {
    it('response should have the encrypted strings for each field', () => {
      const data = {
        "key1": "value1",
        "object1": {
          "key2": "value2"
        },
        "object2": {
          "key3": {
            "key4": "value4"
          }
        }
      }

      return request(app.getServer()).post('/encrypt').send(data).expect(200, {
        "key1": "dmFsdWUx",
        "object1": "eyJrZXkyIjoidmFsdWUyIn0=",
        "object2": "eyJrZXkzIjp7ImtleTQiOiJ2YWx1ZTQifX0="
      });
    });
  });

  describe('[POST] /decrypt', () => {
    it('response should contain the whole decrypted objects', () => {
      const data = {
        "key1": "dmFsdWUx",
        "object1": "eyJrZXkyIjoidmFsdWUyIn0=",
        "object2": "eyJrZXkzIjp7ImtleTQiOiJ2YWx1ZTQifX0="
      }

      return request(app.getServer()).post('/decrypt').send(data).expect(200, {
        "key1": "value1",
        "object1": {
          "key2": "value2"
        },
        "object2": {
          "key3": {
            "key4": "value4"
          }
        }
      });
    });
  });


  describe('[POST] /sign', () => {
    it('response should contain the signed data and its signature', () => {
      const data = {
        "key1": "value1",
        "object1": {
          "key2": "value2"
        },
        "object2": {
          "key3": {
            "key4": "value4"
          }
        }
      }

      return request(app.getServer()).post('/sign').send(data).expect(200, {
        "signature": "056345fb6f819d5739872ff4206254607252da61cebcda2a4947d12231d391c8"
      });
    });
  });

  describe('[POST] /verify', () => {
    it('response code should be 204 when the good signature is provided', () => {
      const data = {
        "signature": "056345fb6f819d5739872ff4206254607252da61cebcda2a4947d12231d391c8",
        "data": {
          "key1": "value1",
          "object1": {
            "key2": "value2"
          },
          "object2": {
            "key3": {
              "key4": "value4"
            }
          }
        }
      }

      return request(app.getServer()).post('/verify').send(data).expect(204);
    });

    it('response code should be 400 when signature provided is wrong', () => {
      const data = {
        "signature": "wrong_signature",
        "data": {
          "key1": "value1",
          "object1": {
            "key2": "value2"
          },
          "object2": {
            "key3": {
              "key4": "value4"
            }
          }
        }
      }

      return request(app.getServer()).post('/verify').send(data).expect(400);
    });

    it('response code should be 400 when the field signature is not provided', () => {
      const data = {
        "data": {
          "key1": "value1",
          "object1": {
            "key2": "value2"
          },
          "object2": {
            "key3": {
              "key4": "value4"
            }
          }
        }
      }

      return request(app.getServer()).post('/verify').send(data).expect(400);
    });
    it('response code should be 400 when the field data is not provided', () => {
      const data = {
        "signature": "056345fb6f819d5739872ff4206254607252da61cebcda2a4947d12231d391c8"
      }

      return request(app.getServer()).post('/verify').send(data).expect(400);
    });
  });
});
