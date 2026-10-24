
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TaskContext = createContext(null);

const initialTasks = [
  {
    id: "task-1",
    title: "Design the landing page",
    description: "Create a clean and modern landing page UI.",
    status: "todo",
    priority: "High",
    category: "Design",
    dueDate: "",
  },
  {
    id: "task-2",
    title: "Build dashboard components",
    description: "Develop reusable React components.",
    status: "progress",
    priority: "High",
    category: "Development",
    dueDate: "",
  },
  {
    id: "task-3",
    title: "Plan project milestones",
    description: "Break the project into manageable tasks.",
    status: "todo",
    priority: "Medium",
    category: "Planning",
    dueDate: "",
  },
  {
    id: "task-4",
    title: "Set up the project",
    description: "Initialize the React and Vite project.",
    status: "done",
    priority: "Low",
    category: "Development",
    dueDate: "",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");

      if (savedTasks !== null) {
        const parsed = JSON.parse(savedTasks);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Could not load saved tasks:", error);
    }

    return initialTasks;
  });

  const [storageReady, setStorageReady] = useState(false);

  // Save changes to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    } finally {
      setStorageReady(true);
    }
  }, [tasks]);

  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status || "todo",
      priority: taskData.priority || "Medium",
      category: taskData.category || "General",
      dueDate: taskData.dueDate || "",
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function updateTask(id, changes) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...changes,
              title: changes.title?.trim() ?? task.title,
              description:
                changes.description?.trim() ?? task.description,
            }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function moveTask(id, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        storageReady,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used inside TaskProvider");
  }

  return context;
}
