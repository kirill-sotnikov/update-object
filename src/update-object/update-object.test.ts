import { expect, test } from "vitest";
import { updateObject } from "../update-object";

test("change object", () => {
  expect(
    (() => {
      const person = {
        name: "Vasya",
        age: 10,
        parent: {
          father: {
            name: "Roma",
            age: 41,
          },
          mom: {
            name: "Rosa",
            age: 35,
          },
        },
        ban: () => {},
      };

      return updateObject(person, { parent: { father: { age: 36 } } });
    })()
  ).toMatchInlineSnapshot(`
    {
      "age": 10,
      "ban": [Function],
      "name": "Vasya",
      "parent": {
        "father": {
          "age": 36,
          "name": "Roma",
        },
        "mom": {
          "age": 35,
          "name": "Rosa",
        },
      },
    }
  `);
});

test("change object with func", () => {
  expect(
    (() => {
      const person = {
        name: "Vasya",
        age: 10,
        parent: {
          father: {
            name: "Roma",
            age: 41,
          },
          mom: {
            name: "Rosa",
            age: 35,
            hi: () => {
              return "hi";
            },
          },
        },
      };

      const changedObject = updateObject(person, {
        parent: { father: { age: 36 } },
      });

      return changedObject.parent.mom.hi();
    })()
  ).toBe("hi");
});

test("change object with optional keys", () => {
  expect(
    (() => {
      interface Person {
        name: string;
        age: number;
        parent?: Parent;
      }

      interface Parent {
        father?: Person;
        mom?: Person;
      }

      const person: Person = {
        age: 10,
        name: "Vasya",
      };

      const changedObject = updateObject(person, {
        parent: { father: { age: 100, name: "Kirill" } },
      });

      return changedObject;
    })()
  ).toMatchInlineSnapshot(`
    {
      "age": 10,
      "name": "Vasya",
      "parent": {
        "father": {
          "age": 100,
          "name": "Kirill",
        },
      },
    }
  `);
});
