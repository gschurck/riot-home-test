import {Router} from 'express';
import {Routes} from '@interfaces/routes.interface';
import {CryptographyController} from "@controllers/cryptography.controller";
import {VerifySignatureDto} from "@dtos/cryptography.dto";
import {ValidationMiddleware} from "@middlewares/validation.middleware";

export class CryptographyRoute implements Routes {
  public router = Router();
  public cryptography = new CryptographyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/encrypt', this.cryptography.encrypt);
    this.router.post('/decrypt', this.cryptography.decrypt);
    this.router.post('/sign', this.cryptography.sign);
    this.router.post('/verify', ValidationMiddleware(VerifySignatureDto), this.cryptography.verify);
  }
}
