import { Method } from "../common";
import { MethodMetadataKeys } from "./metadata-keys";

export class MethodMetadata {
  static Define(name: Method, target: any, key: string) {
    Reflect.defineMetadata("METHOD", MethodMetadataKeys[name], target[key]);
  }
}
