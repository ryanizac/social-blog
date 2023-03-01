import { IController } from "./controller";
import { Options } from "./options";

export function Controller<C extends IController>(options: Options) {
  return (Controller: C) => {};
}
