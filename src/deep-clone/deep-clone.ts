export const deepClone = <T extends Object, K extends keyof T>(object: T) => {
  let result: Partial<T> = {};

  if (typeof object === "object") {
    for (const [key, value] of Object.entries(object)) {
      if (typeof value === "object" && value !== null) {
        result[key as K] = deepClone(value);
      } else {
        result[key as K] = value;
      }
    }
  }

  return result as T;
};
