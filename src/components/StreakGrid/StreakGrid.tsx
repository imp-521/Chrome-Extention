import React, { useEffect, useRef, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { ActivityCalendar } from "react-activity-calendar";
import {
  ACTIVITY_UPDATED_EVENT,
  dateKeyOf,
  getActivityMap,
} from "@/src/utils/activityStore";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

type ActivityDay = {
  date: string;
  count: number;
  level: number;
};

const getRangeDates = (rangeId: string) => {
  const today = new Date();

  if (rangeId === "year") {
    return {
      start: new Date(Date.UTC(today.getUTCFullYear(), 0, 1)),
      end: new Date(Date.UTC(today.getUTCFullYear(), 11, 31)),
    };
  }

  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 364);

  return {
    start,
    end: today,
  };
};

const toActivityDays = (
  map: Record<string, number>,
  rangeId: string,
): ActivityDay[] => {
  const { start, end } = getRangeDates(rangeId);

  const data: ActivityDay[] = [];

  const cursor = new Date(start);

  while (cursor <= end) {
    const date = dateKeyOf(cursor);

    const raw = Number(map[date]);

    const count = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;

    data.push({
      date,
      count,
      level: Math.min(count, 4),
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return data;
};

const computeStats = (data: ActivityDay[]) => {
  if (data.length === 0) {
    return { totalActiveDays: 0, maxStreak: 0, currentStreak: 0 };
  }

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

const StreakGrid = () => {
  const [range, setRange] = useState("current");
  const [rangeMenuOpen, setRangeMenuOpen] = useState(false);
  const rangeMenuRef = useRef<HTMLDivElement>(null);
  const [activityMap, setActivityMap] = useState<Record<string, number> | null>(
    null,
  );

  useEffect(() => {
    const loadActivity = async () => {
      const data = await getActivityMap();
      setActivityMap(data);
    };

    loadActivity();
  }, []);

  useEffect(() => {
    const handleActivityUpdate = async () => {
      const data = await getActivityMap();
      setActivityMap(data);
    };

    window.addEventListener(ACTIVITY_UPDATED_EVENT, handleActivityUpdate);

    return () => {
      window.removeEventListener(ACTIVITY_UPDATED_EVENT, handleActivityUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rangeMenuRef.current &&
        !rangeMenuRef.current.contains(event.target as Node)
      ) {
        setRangeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activityData = activityMap ? toActivityDays(activityMap, range) : [];
  const stats = computeStats(activityData);

  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-2.5 text-white font-gilroy-medium w-full h-full flex flex-col shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-1.5 text-white/70 cursor-grab text-xs">
          <MdDragIndicator className="text-lg text-white/70" />
          <span className="select-none">Streak Grid View</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs select-none">
            <span>Active Days:</span>
            <span>{stats.totalActiveDays}</span>
          </div>

          <div className="flex items-center gap-1 text-xs select-none">
            <span>Current Streak:</span>
            <span>{stats.currentStreak}</span>
          </div>

          <div className="flex items-center gap-1 text-xs select-none">
            <span>Max Streak:</span>
            <span>{stats.maxStreak}</span>
          </div>

          <div className="relative" ref={rangeMenuRef}>
            <button
              type="button"
              onClick={() => setRangeMenuOpen((prev) => !prev)}
              className="range-dropdown h-7 px-3.5 rounded-full flex items-center gap-1.5 text-xs font-gilroy-medium text-white/90 hover:text-white transition-all cursor-pointer"
            >
              <span>{range === "current" ? "Current" : "This Year"}</span>

              <IoChevronDown
                className={`text-xs transition-transform ${
                  rangeMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {rangeMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 min-w-[110px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl z-50 flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setRange("current");
                    setRangeMenuOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                    range === "current"
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>Current</span>
                  {range === "current" && <IoCheckmark className="text-xs" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRange("year");
                    setRangeMenuOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                    range === "year"
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>This Year</span>
                  {range === "year" && <IoCheckmark className="text-xs" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-x-auto scrollbar-hide z-10 relative pt-5">
        <span className="text-white/40 text-xs select-none">
          {activityData.length > 0 && (
            <ActivityCalendar
              data={activityData}
              colorScheme="dark"
              blockSize={12}
              blockMargin={4}
              blockRadius={3}
              fontSize={11}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default StreakGrid;
