interface Stats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}

interface TodoStatsProps {
  stats: Stats;
}

export function TodoStats({ stats }: TodoStatsProps) {
  const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const cards = [
    { label: '전체', value: stats.total, color: 'text-indigo-500 dark:text-indigo-400' },
    { label: '진행중', value: stats.active, color: 'text-amber-500 dark:text-amber-400' },
    { label: '완료', value: stats.completed, color: 'text-emerald-500 dark:text-emerald-400' },
    { label: '기한 초과', value: stats.overdue, color: 'text-rose-500 dark:text-rose-400' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <div className="grid grid-cols-4 gap-3 mb-4">
        {cards.map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>진행률</span>
          <span className="font-medium text-emerald-500 dark:text-emerald-400">{percent}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
