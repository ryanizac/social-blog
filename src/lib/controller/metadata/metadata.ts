import "reflect-metadata";
import { IController } from "../controller";
import { ControllerMetadataKeys } from "./metada-keys";
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

  private defineMetadata(key: keyof typeof ControllerMetadataKeys, value: any) {
    const metadatakey = ControllerMetadataKeys[key];
    Reflect.defineMetadata(metadatakey, value, this.Controller);
  }

  protected defineController() {
    this.defineMetadata("CONTROLLER", true);
  }

  protected defineBasepath() {
    this.defineMetadata("BASEPATH", this.basepath);
  }

  static Define<C extends IController>(
    Controller: C,
    options?: ControllerOptions
  ) {
    const metadata = new ControllerMetadata(Controller, options);

    metadata.defineController();
    metadata.defineBasepath();
  }
}
