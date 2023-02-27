import { createServer } from "./lib";

class App {
  static async importControllers() {
    const mod = await import("./controllers");
    return mod.controllers;
  }

  static async main() {
    const server = createServer();

    await server.registerControllersAync(this.importControllers);
    await server.autostart();
  }
}

App.main();
