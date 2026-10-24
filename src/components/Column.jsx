
import { useState } from "react";
import TaskCard from "./TaskCard";
import { useTask } from "../context/TaskContext";

export default function Column({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
}) {
  const { moveTask } = useTask();
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  }

  function handleDrop(event) {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/plain");

    if (taskId) {
      moveTask(taskId, status);
    }

    setIsDragOver(false);
  }

  return (
    <section
      className={`kanban-column column-${status} ${
        isDragOver ? "drag-over" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsDragOver(false);
        }
      }}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <div className="column-title-group">
          <span className={`status-dot dot-${status}`} />
          <h2>{title}</h2>
          <span className="task-count">{tasks.length}</span>
        </div>

        <button
          type="button"
          className="column-add"
          title={`Add task to ${title}`}
          onClick={() => onAddTask(status)}
        >
          +
        </button>
      </header>

      <div className="column-task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
          />
        ))}

        {tasks.length === 0 && (
          <div className="empty-column">
            <span>＋</span>
            <p>No tasks here yet</p>
            <small>Drop a task here or add a new one.</small>
          </div>
        )}
      </div>

      <button
        type="button"
        className="add-task-link"
        onClick={() => onAddTask(status)}
      >
        + Add task
      </button>
    </section>
  );
}
