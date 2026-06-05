export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    try {
      const parsed = JSON.parse((error as { response: string }).response) as {
        reason?: string;
      };

      return parsed.reason ?? 'Неизвестная ошибка';
    } catch {
      return 'Неизвестная ошибка';
    }
  }

  return 'Неизвестная ошибка';
}
