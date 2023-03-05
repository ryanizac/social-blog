import { Method } from "../common";
import { MethodMetadata } from "./metadata";

export function MethodDecorator(methodName: Method = "GET") {
  return (target: any, key: string) => {
    MethodMetadata.Define(methodName, target, key);
  };
}
