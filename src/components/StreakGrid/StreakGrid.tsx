import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { ActivityCalendar } from "react-activity-calendar";

const demoData = Array.from({ length: 365 }, (_, index) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - (364 - index));

  const count = Math.floor(Math.random() * 5);

  return {
    date: date.toISOString().slice(0, 10),
    count,
    level: count,
  };
});

const StreakGrid = () => {
  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-2.5 text-white font-gilroy-medium w-full h-full flex flex-col shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <MdDragIndicator className="text-lg cursor-grab text-white/70" />
          <span>Streak Grid View</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span>Active Days:</span>
            <span>12</span>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span>Current Streak:</span>
            <span>3</span>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span>Max Streak:</span>
            <span>7</span>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-x-auto scrollbar-hide z-10 relative pt-1.5">
        <span className="text-white/40 text-xs">
          <ActivityCalendar
            data={demoData}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            blockRadius={3}
            fontSize={11}
          />
        </span>
      </div>
    </div>
  );
};

export default StreakGrid;
