import { useState } from 'react';
import type { FormEvent } from 'react';
import { Circle, CheckCircle2, Pencil, Trash2, Calendar, Tag, X, Check } from 'lucide-react';
import type { Todo, Priority } from '../types/todo';
import { PRIORITY_LABELS, PRIORITY_BADGE, PRIORITY_BTN_ACTIVE } from '../types/todo';
import { formatDate, isOverdue } from '../utils/date';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
}

const INPUT_CLS =
  'w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-slate-800 dark:text-slate-100';

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '');
  const [editTags, setEditTags] = useState(todo.tags.join(', '));
  const [confirmDelete, setConfirmDelete] = useState(false);

  const overdue = isOverdue(todo.dueDate, todo.completed);

  const startEdit = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate ?? '');
    setEditTags(todo.tags.join(', '));
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);

  const saveEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
      tags: editTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-indigo-700/50 shadow-sm p-4 animate-[fadeIn_0.15s_ease-out]">
        <form onSubmit={saveEdit} className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            placeholder="할일 제목"
            className={INPUT_CLS}
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="설명 (선택사항)"
            rows={2}
            className={`${INPUT_CLS} resize-none`}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">우선순위</span>
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setEditPriority(p)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    editPriority === p
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
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-slate-800 dark:text-slate-100 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">태그</span>
            <input
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              placeholder="태그1, 태그2"
              className={INPUT_CLS}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X size={13} />
              취소
            </button>
            <button
              type="submit"
              disabled={!editTitle.trim()}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white font-medium transition-colors"
            >
              <Check size={13} />
              저장
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`group bg-white dark:bg-slate-800 rounded-2xl border shadow-sm p-4 transition-all duration-200 ${
        todo.completed
          ? 'border-slate-100 dark:border-slate-700/50 opacity-60'
          : overdue
            ? 'border-rose-200 dark:border-rose-900/50'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 shrink-0 transition-colors duration-150 ${
            todo.completed
              ? 'text-emerald-500 dark:text-emerald-400'
              : 'text-slate-300 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400'
          }`}
        >
          {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-medium leading-snug break-words ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {todo.title}
          </p>

          {todo.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 break-words">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_BADGE[todo.priority]}`}>
              {PRIORITY_LABELS[todo.priority]}
            </span>

            {todo.dueDate && (
              <span
                className={`flex items-center gap-1 text-xs ${
                  overdue
                    ? 'text-rose-500 dark:text-rose-400 font-medium'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <Calendar size={11} />
                {formatDate(todo.dueDate)}
                {overdue && ' · 기한 초과'}
              </span>
            )}

            {todo.tags.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Tag size={11} />
                {todo.tags.map((t) => `#${t}`).join(' ')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={startEdit}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
            title="수정"
          >
            <Pencil size={14} />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(todo.id)}
                className="text-xs px-2 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                삭제
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs px-2 py-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
              title="삭제"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
