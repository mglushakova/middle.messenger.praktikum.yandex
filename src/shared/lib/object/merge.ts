import type { Indexed } from '@/shared/types/indexed';

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const [key, value] of Object.entries(rhs)) {
    if (
      typeof value === 'object' &&
      value !== null &&
      typeof lhs[key] === 'object' &&
      lhs[key] !== null
    ) {
      lhs[key] = merge(lhs[key] as Indexed, value as Indexed);
    } else {
      lhs[key] = value;
    }
  }

  return lhs;
}
