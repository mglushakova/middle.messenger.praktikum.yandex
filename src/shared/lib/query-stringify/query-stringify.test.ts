import { describe, expect, it } from '@jest/globals';
import { queryStringify } from './query-stringify';

describe('queryStringify', () => {
  it('converts object to query string', () => {
    expect(
      queryStringify({
        login: 'ivan',
        limit: 10,
      }),
    ).toBe('?login=ivan&limit=10');
  });
});
