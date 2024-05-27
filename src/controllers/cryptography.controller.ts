import {NextFunction, Request, Response} from 'express';
import {Container} from 'typedi';
import {CryptographyService} from "@services/cryptography.service";

export class CryptographyController {
  public cryptography = Container.get(CryptographyService);

  public encrypt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const encryptedData = await this.cryptography.encryptObjectValues(req.body);

      res.status(200).json(encryptedData);
    } catch (error) {
      next(error);
    }
  }

  public decrypt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const decryptedData = await this.cryptography.decryptObjectValues(req.body);

      res.status(200).json(decryptedData);
    } catch (error) {
      next(error);
    }
  }
}
