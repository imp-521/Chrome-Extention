import React, { useEffect, useState } from "react";

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(24 * 60);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "rest">("focus");

  const handleChangeMode = (changeMode: "focus" | "rest") => {
    setMode(changeMode);
    setIsRunning(false);

    const newDuration = changeMode === "focus" ? 24 * 60 : 5 * 60;
    setSeconds(newDuration);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    const newDuration = mode === "focus" ? 24 * 60 : 5 * 60;
    setSeconds(newDuration);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
    }
  }, [seconds]);

  return (
    <div className="figma-glass-static relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] px-[20px] py-[13px] text-white select-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wide">Focus</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-black/20 p-1">
          <button
            onClick={() => {
              handleChangeMode("focus");
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              mode === "focus"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => {
              handleChangeMode("rest");
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium text-white/60 transition hover:text-white ${
              mode === "rest"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white"
            }}`}
          >
            Rest
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 font-heathergreen text-[72px] leading-none tabular-nums">
        {String(minutes).padStart(2, "0")}:
        {String(remainingSeconds).padStart(2, "0")}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="rounded-xl bg-white/20 px-4 py-2 transition hover:bg-white/30 disabled:opacity-50"
        >
          Start
        </button>

        <button
          onClick={handleReset}
          className="rounded-xl bg-white/10 px-4 py-2 transition hover:bg-white/20"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
