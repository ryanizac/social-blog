import { Application } from "./lib/application";
import { createServer } from "./lib";
import { controllers } from "./controllers";

@Application()
export class App {
  static async main() {
    const server = createServer();
    server.registerControllers(...controllers);
    await server.autostart();
  }
}
