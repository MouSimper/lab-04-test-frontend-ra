import { Todo } from "./TodoList";

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export default function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const completionPercentage =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center p-6 rounded-lg border-2"
      style={{
        backgroundColor: "var(--card-background)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mb-4 md:mb-0 flex-grow" data-testid="todo-count">
        <p
          className="text-base font-medium mb-3"
          style={{ color: "var(--foreground)" }}
        >
          {activeTodos} tareas pendientes | {completedTodos} completadas
        </p>
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          <div
            className="h-3 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: completedTodos > 0 ? "#10b981" : "transparent",
            }}
            data-testid="progress-bar"
          ></div>
        </div>
        <p
          className="text-sm mt-2 font-medium"
          style={{ color: "var(--muted-text)" }}
        >
          {completionPercentage}% completado
        </p>
      </div>
      <button
        onClick={onClearCompleted}
        className="px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ml-0 md:ml-6"
        style={{
          color: "#dc2626",
          borderColor: "#dc2626",
          backgroundColor: "transparent",
        }}
        disabled={completedTodos === 0}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "#fef2f2";
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
        data-testid="clear-completed"
      >
        {`Limpiar completadas (${completedTodos})`}
      </button>
    </div>
  );
}
