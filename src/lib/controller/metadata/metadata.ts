import "reflect-metadata";
import { IController } from "../controller";

export class ControllerMetadata<C extends IController> {
  private Controller: C;

  private constructor(Controller: C) {
    this.Controller = Controller;
  }

  static Define<C extends IController>(Controller: C) {
    const metadata = new ControllerMetadata(Controller);
  }
}
