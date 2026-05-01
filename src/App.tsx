import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { TodoStats } from './components/TodoStats';
import { TodoInput } from './components/TodoInput';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';

export default function App() {
  const {
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />

        <div className="mt-6 space-y-4">
          <TodoStats stats={stats} />
          <TodoInput onAdd={addTodo} />
          <TodoFilters
            filter={filter}
            sortBy={sortBy}
            searchQuery={searchQuery}
            completedCount={stats.completed}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
            onSearchChange={setSearchQuery}
            onClearCompleted={clearCompleted}
          />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}
