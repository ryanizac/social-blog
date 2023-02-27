import { createServer } from "./lib";

async function main() {
  const server = createServer();

  await server.autostart();
}

main();
