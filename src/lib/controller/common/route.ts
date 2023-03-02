import { Method } from "./method";
import { RequestHandler } from "./request-handler";

export type Route = {
  path: string;
  method: Method;
  handle: RequestHandler;
};
