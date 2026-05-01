export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false;
  return dueDate < todayStr();
}
