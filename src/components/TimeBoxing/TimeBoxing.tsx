import React, { useState } from "react";
import { IconType } from "react-icons";
import { MdDragIndicator } from "react-icons/md";
import { RiAddLine, RiArrowDownSLine, RiCodeSSlashLine } from "react-icons/ri";
import {
  RiSunLine,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiFireFill,
} from "react-icons/ri";

type Subtask = {
  id: number;
  title: string;
  done: boolean;
};

type TimeBlock = {
  id: number;
  title: string;
  icon: IconType;
  startTime: string;
  endTime: string;
  color: ColorName;
  streak: number;
  subtasks: Subtask[];
};

type ColorStyle = {
  dot: string;
  icon: string;
  card: string;
  progress: string;
};

type ColorName = "amber" | "blue";

const INITIAL_BLOCKS: TimeBlock[] = [
  {
    id: 1,
    title: "Morning Routine",
    icon: RiSunLine,
    startTime: "09:00",
    endTime: "11:00",
    color: "amber",
    streak: 2,
    subtasks: [
      { id: 1, title: "Check emails", done: true },
      { id: 2, title: "Plan the day", done: false },
      { id: 3, title: "Review priorities", done: false },
    ],
  },
  {
    id: 2,
    title: "Deep Work",
    icon: RiCodeSSlashLine,
    startTime: "11:00",
    endTime: "13:00",
    color: "blue",
    streak: 0,
    subtasks: [
      { id: 1, title: "Work on main project", done: false },
      { id: 2, title: "Review code", done: false },
    ],
  },
];

const COLOR_STYLES: Record<ColorName, ColorStyle> = {
  amber: {
    dot: "bg-amber-400",
    icon: "text-amber-300",
    card: "border-amber-400/30 bg-amber-400/[0.07] ring-1 ring-amber-400/10",
    progress: "bg-amber-400",
  },
  blue: {
    dot: "bg-blue-400",
    icon: "text-blue-300",
    card: "border-blue-400/30 bg-blue-400/[0.07] ring-1 ring-blue-400/10",
    progress: "bg-blue-400",
  },
};
const TimeBoxing = () => {
  const [blocks, setBlocks] = useState<TimeBlock[]>(INITIAL_BLOCKS);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [newSubtasks, setNewSubtasks] = useState<Subtask[]>([]);
  const [newStartTime, setNewStartTime] = useState("09:00");
  const [newEndTime, setNewEndTime] = useState("11:00");

  const toggleSubtask = (blockId: number, subtaskId: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id !== blockId) return block;

        return {
          ...block,
          subtasks: block.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, done: !subtask.done }
              : subtask,
          ),
        };
      }),
    );
  };

  const toggleExpand = (blockId: number) => {
    setExpandedId((prevId) => (prevId === blockId ? null : blockId));
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;

    const newBlock: TimeBlock = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      icon: RiSunLine,
      startTime: "09:00",
      endTime: "11:00",
      color: "amber",
      streak: 0,
      subtasks: newSubtasks,
    };
    setNewTaskTitle("");
    setIsFormOpen(false);
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setExpandedId(newBlock.id);
    setNewSubtasks([]);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;

    const newSubtask: Subtask = {
      id: Date.now(),
      title: newSubtaskTitle.trim(),
      done: false,
    };

    setNewSubtasks((prev) => [...prev, newSubtask]);
    setNewSubtaskTitle("");
  };

  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-3 text-white font-gilroy-medium w-full h-full select-none flex flex-col shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between z-10 relative shrink-0 mb-3">
        <div className="flex items-center gap-1.5 text-white/70 text-xs font-gilroy-medium cursor-grab">
          <MdDragIndicator className="text-white/50 text-lg" />
          <span>Time Boxing</span>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-white/85 bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/15"
        >
          <RiAddLine className="text-xs" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task Groups + Timeline */}
      <div className="w-full flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto scrollbar-hide relative pr-0.5">
        <div className="flex flex-col gap-2 relative">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/15 pointer-events-none" />

          {blocks.map((block) => {
            const Icon = block.icon;
            const colors = COLOR_STYLES[block.color];
            const completedCount = block.subtasks.filter(
              (subtask) => subtask.done,
            ).length;

            const totalCount = block.subtasks.length;
            const progress =
              totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0;
            return (
              <div
                key={block.id}
                className="group/subtask relative flex items-center gap-2.5 py-[5px] pl-7 rounded-lg transition-all"
              >
                <span className="absolute left-[6px] top-1/2 w-[17px] h-px bg-white/20" />
                {/* Timeline */}
                <div className="w-[70px] shrink-0 relative">
                  <div className="relative flex items-center gap-2">
                    <div
                      className={`relative z-10 w-[11px] h-[11px] rounded-full ${colors.dot} border-2 border-white/20`}
                    />
                    <span className="text-[10px] text-white/50">
                      {block.startTime}
                    </span>
                  </div>
                </div>

                {/* Task Card */}
                <div
                  className={`flex-1 min-w-0 rounded-[18px] border px-4 pt-3.5 pb-4 shadow-lg ${colors.card}`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`${colors.icon} text-lg`} />
                      <span className="text-sm text-white">{block.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/50">
                        {block.startTime} - {block.endTime}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(block.id)}
                        className="text-white/50 hover:text-white transition-transform"
                      >
                        <RiArrowDownSLine
                          className={`text-base transition-transform ${
                            expandedId === block.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-3">
                    {progress === 100 ? (
                      <RiCheckboxCircleFill className="text-green-400 text-sm" />
                    ) : (
                      <RiCheckboxBlankCircleLine className="text-white/50 text-sm" />
                    )}

                    <span className="text-[10px] text-white/60">
                      {completedCount} of {totalCount}
                    </span>

                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors.progress} transition-all`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-white/60">
                      {progress}%
                    </span>

                    <RiFireFill className="text-orange-400 text-sm" />
                    <span className="text-[10px] text-white/60">
                      {block.streak}
                    </span>
                  </div>

                  {/* Subtasks */}
                  {expandedId === block.id && (
                    <div className="relative mt-1.5">
                      {block.subtasks.map((subtask, subIndex) => {
                        const isLastSubtask =
                          subIndex === block.subtasks.length - 1;
                        return (
                          <div
                            key={subtask.id}
                            onClick={() => toggleSubtask(block.id, subtask.id)}
                            className="relative flex items-center gap-2.5 py-[5px] pl-7 rounded-lg transition-all"
                          >
                            <span
                              className={`absolute left-[6px] top-0 w-px bg-white/20 ${
                                isLastSubtask ? "h-1/2" : "bottom-0"
                              }`}
                            />

                            <span className="absolute left-[6px] top-1/2 w-[17px] h-px bg-white/20" />
                            {subtask.done ? (
                              <RiCheckboxCircleFill className="text-green-400 text-base shrink-0" />
                            ) : (
                              <RiCheckboxBlankCircleLine className="text-white/50 text-base shrink-0" />
                            )}

                            <span
                              className={`text-xs ${
                                subtask.done
                                  ? "text-white/40 line-through"
                                  : "text-white/80"
                              }`}
                            >
                              {subtask.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* Add New Task Form */}
          {isFormOpen && (
            <div className="ml-[82px] mt-2 rounded-[18px] border border-dashed border-white/20 bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 mb-4">
                <RiAddLine className="text-white/60 text-lg" />
                <span className="text-xs text-white/80">New Time Block</span>
              </div>

              {/* Icon Picker */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <RiSunLine className="text-amber-300 text-lg" />
                </button>

                <span className="text-[10px] text-white/50">
                  Choose an icon
                </span>
              </div>

              {/* Title */}
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                type="text"
                placeholder="Enter task title..."
                className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-white/30 mb-3"
              />

              {/* Time Picker */}
              <div className="flex items-center gap-2 mb-3">
                {/* Start Time */}
                <button
                  type="button"
                  className="flex-1 flex items-center justify-between bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
                >
                  <span className="text-xs text-white/80">09:00 AM</span>
                  <RiArrowDownSLine className="text-white/50 text-base" />
                </button>

                <span className="text-[10px] text-white/40">to</span>

                {/* End Time */}
                <button
                  type="button"
                  className="flex-1 flex items-center justify-between bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
                >
                  <span className="text-xs text-white/80">11:00 AM</span>
                  <RiArrowDownSLine className="text-white/50 text-base" />
                </button>
              </div>

              {/* Subtask */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  type="text"
                  placeholder="Add a subtask..."
                  className="flex-1 min-w-0 bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-white/30"
                />

                <button
                  onClick={handleAddSubtask}
                  type="button"
                  className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
                >
                  <RiAddLine className="text-base" />
                </button>
              </div>

              {newSubtasks.length > 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  {newSubtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05]"
                    >
                      <RiCheckboxBlankCircleLine className="text-white/50 text-sm" />

                      <span className="text-xs text-white/80">
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-[10px] text-white/60 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveTask}
                  className="px-3 py-1.5 rounded-lg text-[10px] text-white bg-white/15 hover:bg-white/25 transition-colors"
                >
                  Save Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeBoxing;
