import React, { useEffect, useRef, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { storageGet, storageSet } from "../../utils/storage";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiCloseLine,
} from "react-icons/ri";
import { recordActivity, removeActivity } from "@/src/utils/activityStore";

type Task = {
  id: string;
  text: string;
  done: boolean;
};
const STORAGE_KEY = "todo_items_v2";

const getTodayKey = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
  const [newText, setNewText] = useState("");
  const isHydratedRef = useRef(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      text: "Finish the project",
      done: false,
    },
  ]);

  // getting data from storage
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await storageGet(STORAGE_KEY);

      if (Array.isArray(savedTasks)) {
        setTasks(savedTasks);
      }

      isHydratedRef.current = true;
    };

    loadTasks();
  }, []);

  // saving data in the storage
  useEffect(() => {
    if (!isHydratedRef.current) return;
    storageSet(STORAGE_KEY, {
      date: getTodayKey(),
      tasks: tasks,
    });
  }, [tasks]);

  const toggleDone = (id: string) => {
    const selectedTask = tasks.find((task) => task.id === id);

    if (!selectedTask) return;

    const nextDone = !selectedTask.done;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: nextDone } : task)),
    );

    if (nextDone) {
      recordActivity(1);
    } else {
      removeActivity(1);
    }
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
  const addTask = () => {
    const text = newText.trim();

    if (!text) return;

    const task = {
      id: makeId(),
      text,
      done: false,
    };

    setTasks((prev) => [...prev, task]);
    setNewText("");
  };
  return (
    <div className="w-full h-full figma-glass-static group/widget rounded-[26px] p-4 text-white flex flex-col">
      {/* Header */}

      <div className="flex items-center justify-start gap-1 mb-3">
        <span>
          <MdDragIndicator className="text-lg cursor-grab text-white/70" />
        </span>
        <span className="select-none cursor-grab text-white/70 text-xs">
          Notepad
        </span>
      </div>

      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-1.5 z-10 pr-0.5">
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
        <div
          className={`flex items-center gap-2.5 text-xs sm:text-sm py-0.5 transition-opacity duration-200 ${
            newText
              ? "opacity-100"
              : "opacity-0 group-hover/widget:opacity-100 focus-within:opacity-100"
          }`}
        >
          <RiCheckboxBlankCircleLine className="text-base text-white/30 shrink-0" />

          <input
            value={newText}
            onBlur={addTask}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
            className="w-full bg-transparent outline-none font-gilroy-medium text-white placeholder:text-white/30 text-xs sm:text-sm"
            placeholder="Write a task..."
          />
        </div>
      </div>
    </div>
  );
};
export default Todo;
