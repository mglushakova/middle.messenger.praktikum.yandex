import { isArray } from './is-array';
import { isPlainObject, type PlainObject } from './is-plain-object';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
