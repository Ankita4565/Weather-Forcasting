
import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "Medium",
  category: "Development",
  dueDate: "",
};

export default function TaskModal({
  isOpen,
  task,
  defaultStatus = "todo",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "Medium",
        category: task.category || "Development",
        dueDate: task.dueDate || "",
      });
    } else {
      setForm({ ...emptyForm, status: defaultStatus });
    }
  }, [isOpen, task, defaultStatus]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) return;

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {task ? "UPDATE YOUR WORK" : "PLAN SOMETHING NEW"}
            </span>
            <h2 id="modal-title">
              {task ? "Edit task" : "Create a task"}
            </h2>
            <p>Keep the details clear so you know what to do next.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="task-title">Task title *</label>
            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Design the homepage"
              maxLength={100}
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What needs to be done?"
              rows={4}
              maxLength={1000}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="task-category">Category</label>
              <select
                id="task-category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Development</option>
                <option>Design</option>
                <option>Planning</option>
                <option>Research</option>
                <option>Testing</option>
                <option>General</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-due-date">Due date</label>
              <input
                id="task-due-date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="button-primary">
              {task ? "Save changes" : "Create task"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
