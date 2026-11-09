import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { ActivityCalendar } from "react-activity-calendar";

type ActivityDay = {
  date: string;
  count: number;
  level: number;
};

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

const computeStats = (data: ActivityDay[]) => {
  let totalActiveDays = 0;
  let maxStreak = 0;
  let currentRun = 0;

  for (const day of data) {
    if (day.count > 0) {
      totalActiveDays += 1;
      currentRun += 1;

      if (currentRun > maxStreak) {
        maxStreak = currentRun;
      }
    } else {
      currentRun = 0;
    }
  }
  let currentStreak = 0;
  let idx = data.length - 1;
  if (data[idx].count === 0 && data[idx - 1]?.count > 0) {
    idx -= 1;
  }
  while (idx >= 0 && data[idx].count > 0) {
    currentStreak += 1;
    idx -= 1;
  }

  return { totalActiveDays, maxStreak, currentStreak };
};
const { totalActiveDays, maxStreak, currentStreak } = computeStats(demoData);
const StreakGrid = () => {
  const [activityMap, setActivityMap] = React.useState<Record<
    string,
    number
  > | null>(null);
  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-2.5 text-white font-gilroy-medium w-full h-full flex flex-col shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <MdDragIndicator className="text-lg cursor-grab text-white/70" />
          <span className="select-none">Streak Grid View</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs select-none">
            <span>Active Days:</span>
            <span>{totalActiveDays}</span>
          </div>

          <div className="flex items-center gap-1 text-xs select-none">
            <span>Current Streak:</span>
            <span>{currentStreak}</span>
          </div>

          <div className="flex items-center gap-1 text-xs select-none">
            <span>Max Streak:</span>
            <span>{maxStreak}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-x-auto scrollbar-hide z-10 relative pt-1.5">
        <span className="text-white/40 text-xs select-none">
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
