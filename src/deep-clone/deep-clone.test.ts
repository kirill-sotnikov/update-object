import { expect, test } from "vitest";
import { deepClone } from "./deep-clone";

test("clone object", () => {
  expect(
    (() => {
      const someObject = {
        a: 1,
        do: () => console.log("do!"),
        "1": "lol",
        obj: { value: 1 },
      };

      const clone = deepClone(someObject);
      someObject.obj = { value: 10 };
      return clone;
    })()
  ).toMatchInlineSnapshot(`
    {
      "1": "lol",
      "a": 1,
      "do": [Function],
      "obj": {
        "value": 1,
      },
    }
  `);
});
