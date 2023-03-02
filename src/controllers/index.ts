import { IController } from "../lib";
import { ApplicationController } from "./application";
import { UserController } from "./user";

export const controllers: IController[] = [
  ApplicationController,
  UserController,
];
