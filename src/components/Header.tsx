import { Moon, Sun, CheckSquare } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Header({ darkMode, onToggleDark }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <CheckSquare size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
            할일 관리
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">Task Manager</p>
        </div>
      </div>
      <button
        onClick={onToggleDark}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label={darkMode ? '라이트 모드' : '다크 모드'}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
