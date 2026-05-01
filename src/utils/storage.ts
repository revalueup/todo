import type { SavedState } from '../types/todo';

const KEY = 'todo-app-v1';

export function loadState(): Partial<SavedState> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<SavedState>) : {};
  } catch {
    return {};
  }
}

export function saveState(state: Partial<SavedState>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or private mode — ignore
  }
}
