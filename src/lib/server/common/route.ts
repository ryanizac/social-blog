import { Method } from "./method";

export type Route = {
  path: string;
  method: Method;
  handle(): any;
};
