"use client"
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(24 * 60);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [mode, setMode] = useState<"focus" | "rest">("focus");

  const handleChangeMode = (changeMode: "focus" | "rest") => {
    setMode(changeMode);
    setStatus("idle");

    const newDuration = changeMode === "focus" ? 24 * 60 : 5 * 60;
    setSeconds(newDuration);
  };

  const handleStart = () => {
    setStatus("running");
  };

  const handlePause = () => {
    setStatus("paused");
  };

  const handleResume = () => {
    setStatus("running");
  };
  const handleReset = () => {
    setStatus("idle");
    const newDuration = mode === "focus" ? 24 * 60 : 5 * 60;
    setSeconds(newDuration);
  };

  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(0, prevSeconds - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  useEffect(() => {
    if (seconds !== 0) return;
    const nextMode = mode === "focus" ? "rest" : "focus";
    const nextDuration = nextMode === "focus" ? 24 * 60 : 5 * 60;

    setMode(nextMode);
    setSeconds(nextDuration);
    setStatus("idle");
  }, [seconds, mode]);

  return (
    <div className="figma-glass-static relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] px-[20px] py-[13px] text-white select-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wide">{mode === "focus" ? "Focus" : "Rest"}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-md">
          <button
            onClick={() => {
              handleChangeMode("focus");
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              mode === "focus"
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => {
              handleChangeMode("rest");
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              mode === "rest"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Rest
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center font-heathergreen text-[80px] leading-none tabular-nums pb-2">
        {String(minutes).padStart(2, "0")}:
        {String(remainingSeconds).padStart(2, "0")}
      </div>

      <div className="flex gap-3">
        <button
          onClick={
            status === "running"
              ? handlePause
              : status === "paused"
                ? handleResume
                : handleStart
          }
          className="flex min-w-[80px] items-center justify-center rounded-full border border-white/15 bg-white/15 px-5 py-1 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-95"
        >
          {status === "running"
            ? "Pause"
            : status === "paused"
              ? "Resume"
              : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="flex min-w-[80px] items-center justify-center rounded-full border border-white/15 bg-white/15 px-5 py-1 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
