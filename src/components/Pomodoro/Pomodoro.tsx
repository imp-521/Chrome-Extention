"use client";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { RiPauseFill, RiPlayFill, RiRestartLine } from "react-icons/ri";

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
          <span className="text-white/70 text-xs tracking-wide flex items-center justify-center gap-1">
            <MdDragIndicator className="text-lg cursor-grab" />
            {mode === "focus" ? "Focus" : "Rest"}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#0F172A] p-1 backdrop-blur-md">
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
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Rest
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center font-heathergreen text-[95px] leading-none tabular-nums pb-2">
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
          style={{ backgroundColor: "#0F172A" }}
          className="flex flex-1 items-center justify-center rounded-full cursor-pointer px-5 py-1 text-sm font-medium text-white"
        >
          <span className="flex items-center gap-2">
            {status === "running" ? (
              <>
                <RiPauseFill />
                Pause
              </>
            ) : status === "paused" ? (
              <>
                <RiPlayFill />
                Resume
              </>
            ) : (
              <>
                <RiPlayFill />
                Start
              </>
            )}
          </span>
        </button>

        <button
          onClick={handleReset}
          style={{ backgroundColor: "#0F172A" }}
          className="flex flex-1 items-center justify-center rounded-full cursor-pointer px-5 py-1 text-sm font-medium text-white gap-2"
        >
          <RiRestartLine /> Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
