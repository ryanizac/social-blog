export type Options = {
  basepath?: string;
};

const defaultOptions: Options = {};

export function getOptions(options?: Options) {
  return { ...defaultOptions, ...options };
}
