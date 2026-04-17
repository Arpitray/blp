

export type DateFormat = 'short' | 'long' | 'numerical';

export function formatDate(dateString: string, format: DateFormat = 'long', locale = 'en-US') {
  const date = new Date(dateString);
  
  if (format === 'numerical') {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: format === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}
