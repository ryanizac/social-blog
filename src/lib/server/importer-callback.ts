import { IController } from "lib/controller";

export type ImporterCallback = () => Promise<IController[]>;
