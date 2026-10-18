import React, { useEffect, useState } from "react";

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(24 * 60);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const [isRunning, setIsRunning] = useState(false);
  const handleStart = () => {
    setIsRunning(true);
  };
  const handleReset = () =>{
    setIsRunning(false)
    setSeconds(24*60)
  }
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
    if (seconds === 0 ){
        setIsRunning(false)
    }
  }, [seconds])
  
  return (
    <div className="flex h-full flex-col items-center justify-between text-white">
      <h2 className="text-lg font-semibold">Pomodoro</h2>

      <div className="text-4xl font-bold tabular-nums">
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

        <button onClick={handleReset} className="rounded-xl bg-white/10 px-4 py-2 transition hover:bg-white/20">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
