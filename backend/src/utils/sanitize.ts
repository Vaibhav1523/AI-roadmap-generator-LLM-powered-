export function sanitizeString(input: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>?/gm, '').trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeString(value);
    }
  }
  return result;
}
