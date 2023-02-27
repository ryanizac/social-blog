import express, { Express } from "express";
import { ExpressAdapterOptions } from "./express-adapter-options";

export class ExpressAdapter {
  public port: string | number;
  private server: Express;

  private constructor(options: ExpressAdapterOptions) {
    this.port = options.port || process.env.PORT || 3000;
    this.server = express();
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
