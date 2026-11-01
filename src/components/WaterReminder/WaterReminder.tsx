import React, { useEffect, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { RiNotification3Fill, RiNotification3Line } from "react-icons/ri";

const WaterReminder = () => {
  const [goalMl, setGoalMl] = useState(2000);
  const [drunkMl, setDrunkMl] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const remainingMl = Math.max(0, goalMl - drunkMl);
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((drunkMl / goalMl) * 100)),
  );
  const isGoalAchieved = drunkMl >= goalMl;
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedDate, setSavedDate] = useState<string | null>(null);

  const updateDrunk = (nextDrunkMl: number) => {
    const safe = Math.min(goalMl, Math.max(0, Math.round(nextDrunkMl)));
    setDrunkMl(safe);
  };

  const toggleReminder = () => {
    setReminderEnabled((prev) => !prev);
  };

  const formatLiters = (ml: number) => {
    return `${(ml / 1000).toFixed(1)}L`;
  };

  const getTodayDay = () => {
    return new Date().toISOString().split("T")[0];
  };

  // in this use we are reading the informations in the local storage
  useEffect(() => {
    const savedDrunkMl = localStorage.getItem("water-drunk");
    const savedGoalMl = localStorage.getItem("water-goal");
    const savedReminder = localStorage.getItem("water-reminder");
    const savedDate = localStorage.getItem("water-date");
    const today = getTodayDay();
    if (savedDate === today) {
      setDrunkMl(Number(savedDrunkMl));
    } else {
      setDrunkMl(0);
      setSavedDate(today);
    }

    if (savedGoalMl !== null) {
      setGoalMl(Number(savedGoalMl));
    }

    if (savedReminder !== null) {
      setReminderEnabled(savedReminder === "true");
    }

    setIsLoaded(true);
  }, []);

  // in this use we are saving the informations in the local storage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("water-drunk", String(drunkMl));
    localStorage.setItem("water-goal", String(goalMl));
    localStorage.setItem("water-reminder", String(reminderEnabled));
    localStorage.setItem("water-date", String(savedDate));
  }, [drunkMl, isLoaded, goalMl, reminderEnabled, savedDate]);

  return (
    <div className="figma-glass-static water-widget rounded-[26px] px-4 py-2.5 text-white font-gilroy-medium w-full h-full select-none flex flex-col gap-3 shadow-2xl relative overflow-hidden">
      {/* header */}
      <div className="w-full flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <MdDragIndicator className="text-lg cursor-grab" />
          <span>Water Reminder</span>
        </div>

        <button
          type="button"
          onClick={toggleReminder}
          className="h-7 w-7 rounded-full flex items-center justify-center text-white"
          title={reminderEnabled ? "Reminder On" : "Reminder Off"}
          style={{ backgroundColor: "#0F172A" }}
        >
          {reminderEnabled ? (
            <RiNotification3Fill className="text-xs" />
          ) : (
            <RiNotification3Line className="text-xs" />
          )}
        </button>
      </div>
      <div className="flex w-full h-full gap-3 items-center justify-center">
        {/* circle water */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white/80 flex items-center justify-center shrink-0">
          {/* water fill */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out"
            style={{
              height: `${percentage}%`,
              backgroundColor: "#64748B",
            }}
          >
            {percentage > 0 && percentage < 100 && (
              <div className="absolute -top-[12px] left-0 w-[200%] h-[14px] pointer-events-none">
                <svg
                  className="w-full h-full animate-wave-loop"
                  style={{ fill: "#64748B" }}
                  viewBox="0 0 1200 130"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 40 C 150 90, 350 -10, 600 40 C 850 90, 1050 -10, 1200 40 L 1200 130 L 0 130 Z" />
                </svg>
              </div>
            )}
          </div>

          {/*percentage*/}
          <span className="relative z-10 text-2xl font-bold text-white">
            {percentage}%
          </span>
        </div>

        {/* informatins */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-28 py-0.5">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white/70">Goal</span>
              <span className="font-medium text-white/90">
                {formatLiters(goalMl)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-white/70">Drunk</span>
              <span className="font-medium text-white/90">
                {formatLiters(drunkMl)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-white/70">Remaining</span>
              <span className="font-medium text-white/90">
                {formatLiters(remainingMl)}
              </span>
            </div>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-2 mt-auto w-full">
            <button
              type="button"
              disabled={isGoalAchieved}
              onClick={() => updateDrunk(drunkMl + 250)}
              style={{ backgroundColor: "#0F172A" }}
              className={`flex-1 h-8 rounded-full px-3 flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 shadow-sm text-white whitespace-nowrap ${
                isGoalAchieved
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span>1 Cup</span>
            </button>

            <button
              type="button"
              disabled={isGoalAchieved}
              onClick={() => updateDrunk(drunkMl + 500)}
              style={{ backgroundColor: "#0F172A" }}
              className={`flex-1 h-8 rounded-full px-3 flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 shadow-sm text-white whitespace-nowrap ${
                isGoalAchieved
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span>2 Cups</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterReminder;
