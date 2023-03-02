import express, { Express, Request, Response } from "express";
import { IController } from "../controller";
import { ControllerMetadata } from "../controller/metadata";
import { Method } from "../controller";
import { ExpressAdapterOptions } from "./express-adapter-options";
import { ImporterCallback } from "./importer-callback";

export class ExpressAdapter {
  public port: string | number;
  private server: Express;
  private controllers: IController[] = [];

  private constructor(options: ExpressAdapterOptions) {
    this.port = options.port || process.env.PORT || 3000;
    this.server = express();
  }

  async registerControllersAync(importerCallback: ImporterCallback) {
    const controllers = await importerCallback();
    this.controllers.push(...controllers);
  }

  registerControllers(...controllers: IController[]) {
    this.controllers.push(...controllers);
  }

  private adaptExpressRequest(handle: (...args: any[]) => any) {
    return (req: Request, res: Response) => {
      const data = handle({ req, res });

      if (typeof data === "string") {
        return res.send(data);
      }

      res.json(data);
    };
  }

  private setRoutesFromControllers() {
    const server = this.server;
    const controllers = this.controllers;

    controllers.forEach((Controller) => {
      const routes = ControllerMetadata.GetRoutes(Controller);
      routes.forEach((route) => {
        const method = route.method.toLowerCase() as Lowercase<Method>;
        server[method](route.path, this.adaptExpressRequest(route.handle));
      });
    });
  }

  async listen() {
    const PORT = this.port;
    const server = this.server;

    server.listen(PORT, () => {
      console.log(`Server listen on http://localhost:${PORT}`);
    });
  }

  async autostart() {
    this.setRoutesFromControllers();
    await this.listen();
  }

  static Create(options: ExpressAdapterOptions = {}) {
    return new ExpressAdapter(options);
  }
}
