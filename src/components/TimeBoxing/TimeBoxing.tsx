import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { RiAddLine, RiArrowDownSLine } from "react-icons/ri";
import {
  RiSunLine,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiFireFill,
} from "react-icons/ri";

const TimeBoxing = () => {
  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-3 text-white font-gilroy-medium w-full h-full select-none flex flex-col shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between z-10 relative shrink-0 mb-3">
        <div className="flex items-center gap-1.5 text-white/70 text-xs font-gilroy-medium cursor-grab">
          <MdDragIndicator className="text-white/50 text-lg" />
          <span>Time Boxing</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-white/85 bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/15"
        >
          <RiAddLine className="text-xs" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task Groups + Timeline */}
      <div className="w-full flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto scrollbar-hide relative pr-0.5">

        {/* Shared Timeline Line */}
        <div className="absolute left-[5px] top-2 bottom-0 w-px bg-white/15" />

        <div className="flex items-stretch gap-3">
          <div className="w-[70px] shrink-0 relative">
            <div className="relative flex items-center gap-2">
             <div className="relative z-10 w-[11px] h-[11px] rounded-full bg-amber-400 border-2 border-white/20" />
              <span className="text-[10px] text-white/50">09:00</span>
            </div>
          </div>

          {/* Task Card */}
          <div className="flex-1 min-w-0 rounded-[18px] border border-amber-400/30 bg-amber-400/[0.07] ring-1 ring-amber-400/10 px-4 pt-3.5 pb-4 shadow-lg">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RiSunLine className="text-amber-300 text-lg" />
                <span className="text-sm text-white">Morning Routine</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50">09:00 - 11:00</span>
                <RiArrowDownSLine className="text-white/50 text-base" />
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-3">
              <RiCheckboxCircleFill className="text-green-400 text-sm" />
              <span className="text-[10px] text-white/60">1 of 3</span>

              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="w-1/3 h-full rounded-full bg-green-400" />
              </div>

              <span className="text-[10px] text-white/60">33%</span>

              <RiFireFill className="text-orange-400 text-sm" />
              <span className="text-[10px] text-white/60">2</span>
            </div>

            {/* Subtasks */}
            <div className="flex flex-col gap-3 pl-1">
              <div className="flex items-center gap-2">
                <RiCheckboxCircleFill className="text-green-400 text-base shrink-0" />
                <span className="text-xs text-white/40 line-through">
                  Check emails
                </span>
              </div>

              <div className="flex items-center gap-2">
                <RiCheckboxBlankCircleLine className="text-white/50 text-base shrink-0" />
                <span className="text-xs text-white/80">Plan the day</span>
              </div>

              <div className="flex items-center gap-2">
                <RiCheckboxBlankCircleLine className="text-white/50 text-base shrink-0" />
                <span className="text-xs text-white/80">Review priorities</span>
              </div>
            </div>
          </div>
        </div>

        {/* second card */}
        <div className="flex items-stretch gap-3">
          {/* Timeline */}
          <div className="w-[70px] shrink-0 relative">
            <div className="relative flex items-center gap-2">
              <div className="relative z-10 w-[11px] h-[11px] rounded-full bg-blue-400 border-2 border-white/20" />
              <span className="text-[10px] text-white/50">11:00</span>
            </div>
          </div>

          {/* Task Card */}
          <div className="flex-1 min-w-0 rounded-[18px] border border-white/[0.08] bg-white/[0.025] px-4 pt-3.5 pb-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 text-lg">💻</span>
                <span className="text-sm text-white">Deep Work</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50">11:00 - 13:00</span>
                <RiArrowDownSLine className="text-white/50 text-base" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <RiCheckboxBlankCircleLine className="text-white/50 text-sm" />
              <span className="text-[10px] text-white/60">0 of 2</span>

              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="w-0 h-full rounded-full bg-blue-400" />
              </div>

              <span className="text-[10px] text-white/60">0%</span>
            </div>

            <div className="flex flex-col gap-3 pl-1">
              <div className="flex items-center gap-2">
                <RiCheckboxBlankCircleLine className="text-white/50 text-base shrink-0" />
                <span className="text-xs text-white/80">
                  Work on main project
                </span>
              </div>

              <div className="flex items-center gap-2">
                <RiCheckboxBlankCircleLine className="text-white/50 text-base shrink-0" />
                <span className="text-xs text-white/80">Review code</span>
              </div>
            </div>
          </div>
        </div>
        {/* Add New Task Form */}
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

            <span className="text-[10px] text-white/50">Choose an icon</span>
          </div>

          {/* Title */}
          <input
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
              type="text"
              placeholder="Add a subtask..."
              className="flex-1 min-w-0 bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-white/30"
            />

            <button
              type="button"
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
            >
              <RiAddLine className="text-base" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button className="px-3 py-1.5 rounded-lg text-[10px] text-white/60 hover:bg-white/10 transition-colors">
              Cancel
            </button>

            <button className="px-3 py-1.5 rounded-lg text-[10px] text-white bg-white/15 hover:bg-white/25 transition-colors">
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBoxing;
