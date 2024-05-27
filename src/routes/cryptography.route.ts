import {Router} from 'express';
import {Routes} from '@interfaces/routes.interface';
import {CryptographyController} from "@controllers/cryptography.controller";

export class CryptographyRoute implements Routes {
  public router = Router();
  public cryptography = new CryptographyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/encrypt', this.cryptography.encrypt);
    this.router.post('/decrypt', this.cryptography.decrypt);
  }
}
