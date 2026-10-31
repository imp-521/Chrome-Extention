import React, { useEffect, useState } from "react";

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

  const resetDrunk = () => {
    setDrunkMl(0);
  };

  const toggleReminder = () => {
    setReminderEnabled((prev) => !prev);
  };

  const updateGoal = (value: number) => {
    const safeGoal = Math.max(250, Math.round(value));
    setGoalMl(safeGoal);
  };

  const getTodayDay = () =>{
    return new Date().toISOString().split("T")[0]
  }

  
  // in this use we are reading the informations in the local storage 
  useEffect(() => {
    const savedDrunkMl = localStorage.getItem("water-drunk");
    const savedGoalMl = localStorage.getItem("water-goal");
    const savedReminder = localStorage.getItem("water-reminder");
    const savedDate = localStorage.getItem("water-date")
    const today = getTodayDay()
    if(savedDate === today){
       setDrunkMl(Number(savedDrunkMl));
    }else{
       setDrunkMl(0);
    }
    if (savedDrunkMl !== null) {
      setDrunkMl(Number(savedDrunkMl));
    }

    if (savedGoalMl !== null) {
      setGoalMl(Number(savedGoalMl));
    }

    if (savedReminder !== null) {
      setReminderEnabled(savedReminder === "true");
    }

    setIsLoaded(true)
  }, []);

  // in this use we are saving the informations in the local storage 
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("water-drunk", String(drunkMl));
    localStorage.setItem("water-goal", String(goalMl));
    localStorage.setItem("water-reminder", String(reminderEnabled))
    localStorage.setItem("water-date",String(savedDate))

  }, [drunkMl, isLoaded, goalMl, reminderEnabled, savedDate]);

  

  return (
    <div className="w-full h-full min-w-0 overflow-y-auto rounded-2xl bg-slate-800 p-3 text-white">
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm text-slate-300">Water Reminder</span>

        <button
          type="button"
          onClick={toggleReminder}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            reminderEnabled
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          {reminderEnabled ? "ON" : "OFF"}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="min-w-0">
          <p className="text-xs text-slate-400">Drunk</p>
          <p className="text-lg font-bold">{drunkMl} ml</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-400">Daily Goal</p>
          <p className="text-lg font-bold">{goalMl} ml</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-400">Remaining</p>
          <p className="text-lg font-bold">{remainingMl} ml</p>
        </div>
      </div>
      <div className="mt-1">
        <label className="mb-1 block text-xs text-slate-400">
          Daily Goal (ml)
        </label>

        <input
          type="number"
          value={goalMl}
          onChange={(e) => updateGoal(Number(e.target.value))}
          min="250"
          step="250"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        />
      </div>
      <div className="mt-1">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-400">Daily Progress</span>
          <span className="font-bold">{percentage}%</span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          disabled={isGoalAchieved}
          onClick={() => updateDrunk(drunkMl + 250)}
          className="flex-1 min-w-0 rounded-full bg-slate-700 px-2 py-2 text-xs disabled:opacity-40 cursor-pointer"
        >
          1 Cup
        </button>

        <button
          type="button"
          disabled={isGoalAchieved}
          onClick={() => updateDrunk(drunkMl + 500)}
          className="flex-1 min-w-0 rounded-full bg-slate-700 px-2 py-2 text-xs disabled:opacity-40 cursor-pointer"
        >
          2 Cups
        </button>

        <button
          type="button"
          onClick={resetDrunk}
          className="flex-1 min-w-0 rounded-full bg-slate-700 px-2 py-2 text-xs cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WaterReminder;
