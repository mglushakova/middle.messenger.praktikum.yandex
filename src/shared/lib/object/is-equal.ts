import { isArrayOrObject } from './is-array-or-object';
import type { PlainObject } from './is-plain-object';

type Deep = PlainObject | unknown[];

export function isEqual(lhs: Deep, rhs: Deep) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  const isArray = Array.isArray(rhs);
  const isObj = !isArray;

  for (const [key, value] of Object.entries(lhs)) {
    let rightValue;

    if (isObj) {
      rightValue = (rhs as Record<string, unknown>)[key];
    }

    if (Array.isArray(rhs)) {
      rightValue = rhs[Number(key)];
    }
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
