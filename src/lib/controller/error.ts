export class ControllerError extends Error {
  private constructor(message: string) {
    super(message);
    this.name = "ControllerError";
    Object.freeze(this);
  }

  static InvalidController(Controller: any) {
    const isFunction = typeof Controller === "function";
    const content = isFunction ? Controller.name : String(Controller);
    return new ControllerError(`The controller "${content}" is invalid`);
  }
}
