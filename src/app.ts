import 'reflect-metadata';
import express from 'express';
import {NODE_ENV, PORT} from '@config';
import {Routes} from '@interfaces/routes.interface';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port);
  }

  public getServer() {
    return this.app;
  }


  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
