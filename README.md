# Что это?

Это функция для простого обновления ваших объектов, больше не нужно создавать копию объекта, а потом задавать новое значение свойству и стараться случайно не удалить рядом лежащие свойства

## Example

```ts
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

const newPerson = updateObject(person, { parent: { father: { age: 36 } } });

// now newPerson is:
//  {
//   name: "Vasya",
//   age: 10,
//   parent: {
//     father: {
//       name: "Roma",
//       age: 36,
//     },
//     mom: {
//       name: "Rosa",
//       age: 35,
//     },
//   },
//   ban: () => {},
// }
```

По-умолчанию updateObject защищает вас от следующего действия:

```ts
interface Foo {
  age: number;
  name: string;
  info:
    | {
        token: string;
        date: string;
      }
    | {};
}

const foo: Foo = {
  age: 1,
  name: "S",
  info: {
    token: "token",
    date: "123",
  },
};

updateObject(foo, { info: {} });
// объект foo останется прежним
// {
//   age: 1,
//   name: "S",
//   info: {
//     token: "token",
//     date: "123",
//   },
// }
```

Если вы действительно хотите сделать данное действие, тогда вам нужно отключить `safetyMode`

```ts
updateObject(foo, { info: {} }, { safetyMode: false });
// {
//   age: 1,
//   name: "S",
//   info: {},
// }
```
