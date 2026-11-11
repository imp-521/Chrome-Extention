import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";

const ImportantTabs = () => {
  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-3 text-white font-gilroy-medium w-full h-full select-none flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between z-10 relative shrink-0 mb-3">
        <div className="flex items-center gap-1.5 text-white/70 text-xs font-gilroy-medium cursor-grab active:cursor-grabbing select-none">
          <MdDragIndicator className="text-white/50 text-lg cursor-grab" />
          <span>Important Tabs</span>
        </div>
      </div>

      {/* Tabs List */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col justify-start gap-1.5 z-10 pr-0.5">
        {/* Single Tab */}
        <div className="flex items-center justify-between gap-2.5 text-xs sm:text-sm py-0.5 cursor-pointer group">
          {/* Tab Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-white/80 text-base shrink-0">
              <MdDragIndicator />
            </span>

            <span className="font-gilroy-medium text-xs sm:text-sm text-white/90 truncate">
              Daily Work & Productivity
            </span>

            <span className="text-[10px] text-white/35 font-gilroy-medium shrink-0">
              3
            </span>
          </div>

          {/* Open Button */}
          <button
            type="button"
            className="h-6 w-6 rounded-full bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white/80 group-hover:border border-white/20 shrink-0 cursor-pointer"
          >
            <span><RiArrowRightSLine className="text-base" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportantTabs;
