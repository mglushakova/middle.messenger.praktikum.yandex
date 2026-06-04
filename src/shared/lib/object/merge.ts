import type { Indexed } from '@/shared/types/indexed';

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs };

  for (const [key, value] of Object.entries(rhs)) {
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      typeof result[key] === 'object' &&
      result[key] !== null &&
      !Array.isArray(result[key])
    ) {
      result[key] = merge(result[key] as Indexed, value as Indexed);
    } else {
      result[key] = value;
    }
  }

  return result;
}
