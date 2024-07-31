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
