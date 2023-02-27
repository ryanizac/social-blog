import express, { Express } from "express";
import { IController } from "lib/controller";
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

  async listen() {
    const PORT = this.port;
    const server = this.server;

    server.listen(PORT, () => {
      console.log(`Server listen on http://localhost:${PORT}`);
    });
  }

  async autostart() {
    await this.listen();
  }

  static Create(options: ExpressAdapterOptions = {}) {
    return new ExpressAdapter(options);
  }
}
