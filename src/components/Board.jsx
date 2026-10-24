
import Column from "./Column";

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "progress" },
  { title: "Done", status: "done" },
];

export default function Board({
  tasks,
  searchQuery,
  onAddTask,
  onEditTask,
}) {
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={filteredTasks.filter(
            (task) => task.status === column.status
          )}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}
