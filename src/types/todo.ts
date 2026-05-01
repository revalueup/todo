export type Priority = 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'priority' | 'dueDate' | 'title';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  darkMode: boolean;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

export const PRIORITY_BADGE: Record<Priority, string> = {
  high: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
};

export const PRIORITY_BTN_ACTIVE: Record<Priority, string> = {
  high: 'bg-rose-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-emerald-500 text-white',
};
