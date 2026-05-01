import { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus } from 'lucide-react';
import type { Priority } from '../types/todo';
import { PRIORITY_LABELS, PRIORITY_BTN_ACTIVE } from '../types/todo';

interface TodoInputProps {
  onAdd: (data: {
    title: string;
    description: string;
    priority: Priority;
    dueDate: string | null;
    tags: string[];
  }) => void;
}

const INPUT_CLS =
  'w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-slate-800 dark:text-slate-100';

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTagsInput('');
    setExpanded(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="새 할일을 입력하세요..."
          className={INPUT_CLS}
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap shrink-0"
        >
          <Plus size={16} />
          추가
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 animate-[slideIn_0.15s_ease-out]">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명 (선택사항)"
            rows={2}
            className={`${INPUT_CLS} resize-none`}
          />

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">우선순위</span>
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    priority === p
                      ? PRIORITY_BTN_ACTIVE[p]
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {PRIORITY_LABELS[p]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">마감일</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-slate-800 dark:text-slate-100 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">태그</span>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="태그1, 태그2 (쉼표로 구분)"
              className={INPUT_CLS}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={reset}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
