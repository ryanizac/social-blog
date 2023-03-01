import { IController } from "./controller";
import { ControllerMetadata, ControllerOptions } from "./metadata";

export function Controller<C extends IController>(options?: ControllerOptions) {
  return (Controller: C) => {
    ControllerMetadata.Define(Controller, options);
  };
}
