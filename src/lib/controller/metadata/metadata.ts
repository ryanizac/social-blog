import { Route } from "../common";
import "reflect-metadata";
import { IController } from "../controller";
import { ControllerMetadataKeys } from "./metada-keys";
import { ControllerOptions } from "./options";
import { ControllerError } from "../error";

const methodsToIgnore = ["constructor"];

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

  private getMethods() {
    const Controller = this.Controller;
    const allMethodNames = Object.getOwnPropertyNames(Controller.prototype);
    const validMethodNames = allMethodNames.filter((methodName) => {
      if (methodsToIgnore.includes(methodName)) {
        return false;
      }

      return typeof Controller.prototype[methodName] === "function";
    });
    return validMethodNames;
  }

  private joinPath(...paths: string[]) {
    return paths
      .join("/")
      .replace(/\/{2,}/g, "/")
      .replace(/(.+)\/$/, "$1");
  }

  private definePath(methodName: string) {
    const pathname = methodName === "index" ? "/" : methodName;
    return this.joinPath(this.basepath, pathname);
  }

  private createHandle(methodName: string) {
    return () => {
      const data = this.Controller.prototype[methodName]();
      return data;
    };
  }

  protected defineRoutes() {
    const methodNames = this.getMethods();
    const routes: Route[] = [];

    methodNames.forEach((methodName) => {
      const finalPath = this.definePath(methodName);
      const handle = this.createHandle(methodName);

      routes.push({
        path: finalPath,
        method: "GET",
        handle,
      });
    });

    this.defineMetadata("ROUTES", routes);
  }

  static Define<C extends IController>(
    Controller: C,
    options?: ControllerOptions
  ) {
    const metadata = new ControllerMetadata(Controller, options);

    metadata.defineController();
    metadata.defineBasepath();
    metadata.defineRoutes();
  }

  private static isController(Controller: any): boolean {
    if (typeof Controller !== "function") {
      return false;
    }

    const ControllerMetadataKey = Reflect.getMetadata(
      ControllerMetadataKeys.CONTROLLER,
      Controller
    );
    return ControllerMetadataKey === true;
  }

  private static readRoutes<C extends IController>(Controller: C): Route[] {
    return Reflect.getMetadata(ControllerMetadataKeys.ROUTES, Controller);
  }

  static GetRoutes<C extends IController>(Controller: C) {
    const isController = this.isController(Controller);

    if (!isController) {
      throw ControllerError.InvalidController(Controller);
    }

    const routes = this.readRoutes(Controller);
    return routes;
  }
}
