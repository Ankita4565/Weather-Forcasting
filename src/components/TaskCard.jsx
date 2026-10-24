
import { useTask } from "../context/TaskContext";

const statuses = [
  { value: "todo", label: "To Do" },
  { value: "progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskCard({ task, onEdit }) {
  const { deleteTask, moveTask } = useTask();

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", task.id);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <article
      className="task-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="task-card-top">
        <span className={`task-category category-${task.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
          {task.category}
        </span>

        <div className="task-actions">
          <button
            type="button"
            title="Edit task"
            aria-label={`Edit ${task.title}`}
            onClick={() => onEdit(task)}
          >
            ✎
          </button>

          <button
            type="button"
            title="Delete task"
            aria-label={`Delete ${task.title}`}
            onClick={() => {
              if (window.confirm(`Delete "${task.title}"?`)) {
                deleteTask(task.id);
              }
            }}
          >
            ×
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      <p className="task-description">
        {task.description || "No description added."}
      </p>

      <div className="task-card-bottom">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          <span className="priority-dot" />
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="task-due-date">
            ◷ {task.dueDate}
          </span>
        )}
      </div>

      <div className="task-move">
        <label htmlFor={`status-${task.id}`}>Move to</label>
        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) => moveTask(task.id, event.target.value)}
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
