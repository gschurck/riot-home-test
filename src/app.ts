import 'reflect-metadata';
import express from 'express';
import {NODE_ENV, PORT} from '@config';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
  }

  public listen() {
    this.app.listen(this.port);
  }

  public getServer() {
    return this.app;
  }
}
