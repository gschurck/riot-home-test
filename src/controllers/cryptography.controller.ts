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

  public sign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signature = await this.cryptography.sign(req.body);
      const responseObject = {
        signature: signature,
        data: req.body
      }
      res.status(200).json(responseObject);
    } catch (error) {
      next(error);
    }
  }

  public verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signature = req.body.signature;
      const data = req.body.data;
      const isVerified = await this.cryptography.verifySignature(signature, data);
      if (!isVerified) {
        res.status(400).json({error: "Invalid signature"});
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
