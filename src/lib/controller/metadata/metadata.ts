import "reflect-metadata";
import { IController } from "../controller";
import { ControllerOptions } from "./options";

export class ControllerMetadata<C extends IController> {
  private Controller: C;
  private basepath: string;

  private constructor(Controller: C, options?: ControllerOptions) {
    const finalOptions = this.extractOptions(options);

    const basepath = finalOptions.basepath || this.extractBasepath(Controller);

    this.Controller = Controller;
    this.basepath = basepath;
  }

  extractOptions(options?: ControllerOptions): ControllerOptions {
    return { ...options };
  }

  extractBasepath(Controller: C): string {
    return "/" + Controller.name.replace(/Controller$/, "").toLocaleLowerCase();
  }

  static Define<C extends IController>(
    Controller: C,
    options?: ControllerOptions
  ) {
    const metadata = new ControllerMetadata(Controller, options);
  }
}
