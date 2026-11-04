import React, { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiCloseLine,
} from "react-icons/ri";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

const makeId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return String(Date.now() + Math.random());
};


const Todo = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      text: "Finish the project",
      done: false,
    },
  ]);
  const toggleDone = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };
  const saveEdit = (id: string) => {
    const text = editText.trim();

    if (text) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, text } : task)),
      );
    } else {
      removeTask(id);
    }

    setEditingId(null);
    setEditText("");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };
  return (
    <div className="w-full h-full figma-glass-static rounded-[26px] p-4 text-white flex flex-col">
      {/* Header */}

      <div className="flex items-center justify-start gap-1 mb-3">
        <span>
          <MdDragIndicator className="text-lg cursor-grab text-white/70" />
        </span>
        <span className="select-none cursor-grab text-white/70 text-xs">
          Notepad
        </span>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group/task flex items-center gap-2.5 text-xs sm:text-sm py-0.5 rounded-lg transition-all"
          >
            {/* Checkbox */}
            <button
              type="button"
              onClick={() => toggleDone(task.id)}
              title={task.done ? "Mark as not done" : "Mark as done"}
              className="shrink-0 text-white/80 hover:text-white cursor-pointer focus:outline-none"
            >
              {task.done ? (
                <RiCheckboxCircleFill className="text-base text-white/70" />
              ) : (
                <RiCheckboxBlankCircleLine className="text-base text-white/60 hover:text-white" />
              )}
            </button>

            {/* Task Title */}
            {editingId === task.id ? (
              <input
                autoFocus
                onBlur={() => {
                  saveEdit(task.id);
                }}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveEdit(task.id);
                  }
                  if (e.key === "Escape") {
                    cancelEdit();
                  }
                }}
                className="flex-1 min-w-0 bg-white/10 rounded-md px-2 py-0.5 outline-none text-white select-text text-xs sm:text-sm"
              />
            ) : (
              <span
                onClick={() => startEditing(task)}
                title="Click to edit"
                className={`flex-1 min-w-0 font-gilroy-medium cursor-text truncate ${
                  task.done ? "line-through text-white/40" : "text-white/90"
                }`}
              >
                {task.text}
              </span>
            )}

            {/* Delete Button */}
            <button
              onClick={() => removeTask(task.id)}
              type="button"
              className="opacity-0 group-hover/task:opacity-100 text-white/30 hover:text-white/80 transition-opacity p-0.5 cursor-pointer shrink-0"
              title="Delete task"
            >
              <RiCloseLine className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Todo;
