import { IApplication } from "./application";
import { ApplicationOptions, defaultOptions } from "./options";

function getOptions(options?: ApplicationOptions): ApplicationOptions {
  return { ...options, ...defaultOptions };
}

async function execMain(
  options: ApplicationOptions,
  Application: IApplication
) {
  if (!options.autostart) {
    return;
  }

  if ("main" in Application && typeof Application.main === "function") {
    Application.main();
  }
}

export function Application<A extends IApplication>(
  initialOptions?: ApplicationOptions
) {
  const options = getOptions(initialOptions);

  return (Application: A) => {
    execMain(options, Application);
  };
}
