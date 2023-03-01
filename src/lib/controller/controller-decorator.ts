import { IController } from "./controller";
import { ControllerMetadata } from "./metadata";
import { getOptions, Options } from "./options";

export function Controller<C extends IController>(options?: Options) {
  const finalOptions = getOptions(options);

  return (Controller: C) => {
    ControllerMetadata.Define(Controller);
  };
}
