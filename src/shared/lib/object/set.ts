import type { Indexed } from '@/shared/types/indexed';
import { merge } from './merge';

export function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Indexed,
  );
  return merge(object as Indexed, result as Indexed);
}
