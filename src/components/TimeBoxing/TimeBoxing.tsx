import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { MdDragIndicator } from "react-icons/md";
import { RiAddLine, RiArrowDownSLine } from "react-icons/ri";
import {
  RiSunLine,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiFireFill,
} from "react-icons/ri";
import TimePicker from "../TimePicker/TimePicker";
import { storageGet, storageSet } from "@/src/utils/storage";
import IconPicker from "../IconPicker/IconPicker";

type Subtask = {
  id: number;
  title: string;
  done: boolean;
};

type TimeBlock = {
  id: number;
  title: string;
  icon: string;
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

const INITIAL_BLOCKS: TimeBlock[] = [];

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
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("11:00 AM");
  const [activeTimeField, setActiveTimeField] = useState<"start" | "end">(
    "start",
  );
  const startTimeRef = useRef<HTMLButtonElement>(null);
  const endTimeRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [shakeSubtaskInput, setShakeSubtaskInput] = useState(false);
  const [shakeTaskTitleInput, setShakeTaskTitleInput] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    const loadBlocks = async () => {
      const savedDate = await storageGet("timeBlocksDate");

      if (savedDate === today) {
        const savedBlocks = await storageGet("timeBlocks");

        if (savedBlocks) {
          setBlocks(savedBlocks);
        }
      }

      setIsLoaded(true);
    };

    loadBlocks();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    storageSet("timeBlocks", blocks);
    storageSet("timeBlocksDate", today);
  }, [blocks, isLoaded]);

  useEffect(() => {
    if (isFormOpen && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isFormOpen]);

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

  const convertTo24Hour = (time: string) => {
    const [timePart, period] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) {
      setShakeTaskTitleInput(false);

      requestAnimationFrame(() => {
        setShakeTaskTitleInput(true);
      });

      return;
    }

    if (newSubtasks.length === 0) {
      setShakeSubtaskInput(false);

      requestAnimationFrame(() => {
        setShakeSubtaskInput(true);
      });
      return;
    }

    const newBlock: TimeBlock = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      icon: selectedIcon || "☀️",
      startTime: convertTo24Hour(startTime),
      endTime: convertTo24Hour(endTime),
      color: "amber",
      streak: 0,
      subtasks: newSubtasks,
    };
    setNewTaskTitle("");
    setSelectedIcon("");
    setIsFormOpen(false);
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setExpandedId(newBlock.id);
    setNewSubtasks([]);
    setShakeSubtaskInput(false);
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

  const ICONS: Record<TimeBlock["icon"], IconType> = {
    sun: RiSunLine,
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
          onClick={() => {
            setShakeTaskTitleInput(false);
            setShakeSubtaskInput(false);
            setIsFormOpen(true);
          }}
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

          {[...blocks]
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((block) => {
              const hour = Number(block.startTime.split(":")[0]);
              const isNight = hour >= 18 || hour < 6;
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
                        className={`relative z-10 w-[11px] h-[11px] rounded-full ${
                          isNight ? "bg-blue-700" : "bg-amber-400"
                        } border-2 border-white/20`}
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
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg">{block.icon}</span>
                        <span className="text-sm text-white truncate">
                          {block.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-white/50 whitespace-nowrap">
                          {block.startTime} - {block.endTime}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpand(block.id)}
                          className="text-white/50 hover:text-white transition-transform"
                        >
                          <RiArrowDownSLine
                            className={`text-base transition-transform  duration-300 ease-in-out ${
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
                              onClick={() =>
                                toggleSubtask(block.id, subtask.id)
                              }
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
            <div
              ref={formRef}
              className="ml-[82px] mt-2 rounded-[18px] border border-dashed border-white/20 bg-white/[0.04] p-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <RiAddLine className="text-white/60 text-lg" />
                <span className="text-xs text-white/80">New Time Block</span>
              </div>

              {/* Icon Picker */}
              <div className="flex items-center gap-2 mb-3 relative">
                <button
                  type="button"
                  onClick={() => setIsIconPickerOpen(true)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  {selectedIcon || "☀️"}
                </button>

                <span className="text-[10px] text-white/50">
                  Choose an icon
                </span>
                {isIconPickerOpen && (
                  <IconPicker
                    onSelect={(icon) => setSelectedIcon(icon)}
                    onClose={() => setIsIconPickerOpen(false)}
                    selectedIcon={selectedIcon}
                  />
                )}
              </div>

              {/* Title */}
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                type="text"
                placeholder="Enter task title..."
                className={`w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-white/30 mb-3 
                } ${shakeTaskTitleInput ? "animate-shake" : ""}`}
              />

              {/* Time Picker */}
              <div className="flex items-center gap-2 mb-3 relative">
                {/* Start Time */}
                <button
                  ref={startTimeRef}
                  type="button"
                  onClick={() => {
                    setActiveTimeField("start");
                    setIsTimePickerOpen(true);
                  }}
                  className="flex-1 flex items-center justify-between bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors shrink-0"
                >
                  <span className="text-xs text-white/80">{startTime}</span>
                  <RiArrowDownSLine className="text-white/50 text-base" />
                </button>

                <span className="text-[10px] text-white/40">to</span>

                {/* End Time */}
                <button
                  ref={endTimeRef}
                  type="button"
                  onClick={() => {
                    setActiveTimeField("end");
                    setIsTimePickerOpen(true);
                  }}
                  className="flex-1 flex items-center justify-between bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors shrink-0"
                >
                  <span className="text-xs text-white/80">{endTime}</span>
                  <RiArrowDownSLine className="text-white/50 text-base" />
                </button>

                {/* Time Picker Popover */}
                {isTimePickerOpen && (
                  <div className="absolute left-full top z-50">
                    <TimePicker
                      current={
                        activeTimeField === "start" ? startTime : endTime
                      }
                      onSelect={(time) => {
                        if (activeTimeField === "start") {
                          setStartTime(time);
                        } else {
                          setEndTime(time);
                        }
                      }}
                      onClose={() => setIsTimePickerOpen(false)}
                      triggerRef={
                        activeTimeField === "start" ? startTimeRef : endTimeRef
                      }
                    />
                  </div>
                )}
              </div>

              {/* Subtask */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  type="text"
                  placeholder="Add a subtask..."
                  className={`flex-1 min-w-0 bg-white/[0.06] border rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none transition-colors duration-200 border-white/10 focus:border-white/30 ${shakeSubtaskInput ? "animate-shake" : ""}`}
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
