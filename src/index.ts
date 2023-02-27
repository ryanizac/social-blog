import { createServer } from "./lib";

async function importControllers() {
  const mod = await import("./controllers");
  return mod.controllers;
}

async function main() {
  const server = createServer();

  await server.registerControllersAync(importControllers);
  await server.autostart();
}

main();
