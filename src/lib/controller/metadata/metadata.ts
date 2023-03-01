import "reflect-metadata";
import { IController } from "../controller";
import { ControllerOptions } from "./options";

export class ControllerMetadata<C extends IController> {
  private Controller: C;

  private constructor(Controller: C, options?: ControllerOptions) {
    const finalOptions = this.extractOptions(options);

    this.Controller = Controller;
  }

  extractOptions(options?: ControllerOptions) {
    return { ...options };
  }

  static Define<C extends IController>(
    Controller: C,
    options?: ControllerOptions
  ) {
    const metadata = new ControllerMetadata(Controller, options);
  }
}
