import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Todo, Priority, FilterType, SortType } from '../types/todo';
import { loadState, saveState } from '../utils/storage';
import { todayStr } from '../utils/date';

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function useTodos() {
  const saved = loadState();

  const [todos, setTodos] = useState<Todo[]>(saved.todos ?? []);
  const [filter, setFilter] = useState<FilterType>(saved.filter ?? 'all');
  const [sortBy, setSortBy] = useState<SortType>(saved.sortBy ?? 'createdAt');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState<boolean>(saved.darkMode ?? false);

  useEffect(() => {
    saveState({ todos, filter, sortBy, darkMode });
  }, [todos, filter, sortBy, darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTodo = useCallback(
    (data: {
      title: string;
      description: string;
      priority: Priority;
      dueDate: string | null;
      tags: string[];
    }) => {
      const now = new Date().toISOString();
      setTodos((prev) => [
        { id: crypto.randomUUID(), ...data, completed: false, createdAt: now, updatedAt: now },
        ...prev,
      ]);
    },
    [],
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTodo = useCallback(
    (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t,
        ),
      );
    },
    [],
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filter === 'active') result = result.filter((t) => !t.completed);
    else if (filter === 'completed') result = result.filter((t) => t.completed);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        case 'title':
          return a.title.localeCompare(b.title, 'ko');
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });

    return result;
  }, [todos, filter, searchQuery, sortBy]);

  const stats = useMemo(() => {
    const today = todayStr();
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
      overdue: todos.filter((t) => !t.completed && t.dueDate !== null && t.dueDate < today).length,
    };
  }, [todos]);

  return {
    filteredTodos,
    filter,
    sortBy,
    searchQuery,
    darkMode,
    stats,
    setFilter,
    setSortBy,
    setSearchQuery,
    setDarkMode,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}
