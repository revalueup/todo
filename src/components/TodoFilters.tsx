import { Search, X } from 'lucide-react';
import type { FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
  completedCount: number;
  onFilterChange: (f: FilterType) => void;
  onSortChange: (s: SortType) => void;
  onSearchChange: (q: string) => void;
  onClearCompleted: () => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '모두' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
];

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'createdAt', label: '최신순' },
  { value: 'priority', label: '우선순위' },
  { value: 'dueDate', label: '마감일' },
  { value: 'title', label: '이름순' },
];

export function TodoFilters({
  filter,
  sortBy,
  searchQuery,
  completedCount,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="할일 검색..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-9 py-2.5 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-slate-800 dark:text-slate-100 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === value
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm cursor-pointer"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
          >
            완료 항목 삭제 ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
