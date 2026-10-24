
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import { useTask } from "./context/TaskContext";
import "./App.css";

export default function App() {
  const { tasks, addTask, updateTask, storageReady } = useTask();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("todo");
  const [activePage, setActivePage] = useState("My Tasks");

  const todoCount = tasks.filter((task) => task.status === "todo").length;
  const progressCount = tasks.filter(
    (task) => task.status === "progress"
  ).length;
  const doneCount = tasks.filter((task) => task.status === "done").length;

  function openNewTask(status = "todo") {
    setEditingTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  }

  function openEditTask(task) {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setModalOpen(true);
  }

  function handleSave(taskData) {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }

    setModalOpen(false);
    setEditingTask(null);
  }

  function navigateTo(page) {
    setActivePage(page);

    if (page === "Overview" || page === "My Tasks") {
      setSearchQuery("");
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <main className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>Website Redesign</strong>
          </div>

          <div className="topbar-actions">
            <span className="save-indicator">
              <span className={`save-dot ${storageReady ? "saved" : ""}`} />
              {storageReady ? "Changes saved" : "Saving changes"}
            </span>
            <div className="topbar-avatar">U</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="heading-kicker">
                <span className="heading-sparkle">✦</span>
                YOUR PERSONAL WORKSPACE
              </div>
              <h1>Website Redesign</h1>
              <p className="page-description">
                Plan, organize, and track your work from start to finish.
              </p>
            </div>

            <button
              type="button"
              className="button-primary create-button"
              onClick={() => openNewTask()}
            >
              <span>＋</span> Add new task
            </button>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-top">
                <span>Total tasks</span>
                <span className="stat-icon total-icon">▤</span>
              </div>
              <strong>{tasks.length}</strong>
              <p>Tasks in your workspace</p>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>To do</span>
                <span className="stat-icon todo-icon">◷</span>
              </div>
              <strong>{todoCount}</strong>
              <p>Waiting to get started</p>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>In progress</span>
                <span className="stat-icon progress-icon">↗</span>
              </div>
              <strong>{progressCount}</strong>
              <p>Currently being worked on</p>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>Completed</span>
                <span className="stat-icon done-icon">✓</span>
              </div>
              <strong>{doneCount}</strong>
              <p>
                {tasks.length
                  ? `${Math.round((doneCount / tasks.length) * 100)}% of all tasks`
                  : "Nothing completed yet"}
              </p>
            </article>
          </section>

          <section className="board-toolbar">
            <div>
              <h2>{activePage === "Activity" ? "Activity overview" : "Project board"}</h2>
              <p>Manage your tasks and keep your project moving.</p>
            </div>

            <div className="toolbar-actions">
              <label className="search-box">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search tasks"
                />
                <kbd>/</kbd>
              </label>

              <button
                type="button"
                className="button-primary toolbar-add"
                onClick={() => openNewTask()}
              >
                ＋ <span>Add task</span>
              </button>
            </div>
          </section>

          <div className="board-meta">
            <span className="board-live-dot" />
            <span>All tasks</span>
            <span className="meta-divider">·</span>
            <span>{tasks.length} tasks</span>
            <span className="board-meta-right">Drag cards to update their status</span>
          </div>

          <Board
            tasks={tasks}
            searchQuery={searchQuery}
            onAddTask={openNewTask}
            onEditTask={openEditTask}
          />

          <footer className="app-footer">
            <span>TaskFlow <span className="footer-separator">·</span> Stay focused, get things done.</span>
            <span>{storageReady ? "✓ Saved locally" : "Preparing local storage..."}</span>
          </footer>
        </div>
      </main>

      <TaskModal
        isOpen={modalOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
