import { deepClone } from "./deep-clone/deep-clone";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const defaultOptions = {
  safetyMode: true,
};

export const updateObject = <T extends Object, K extends keyof T>(
  source: T,
  target: DeepPartial<T>,
  options: Partial<typeof defaultOptions> = {}
) => {
  const { safetyMode } = { ...defaultOptions, ...options };

  let result = deepClone<T, K>(source);

  for (const [key, value] of Object.entries(target)) {
    if (typeof value === "object") {
      if (safetyMode) {
        let innerObject = result[key as K] as object;
        result[key as K] = updateObject(innerObject, value) as T[K];
      } else {
        if (Object.keys(value).length === 0) {
          result[key as K] = {} as T[K];
        } else {
          let innerObject = result[key as K] as object;
          result[key as K] = updateObject(innerObject, value) as T[K];
        }
      }
    } else {
      result[key as K] = value;
    }
  }

  return result;
};
