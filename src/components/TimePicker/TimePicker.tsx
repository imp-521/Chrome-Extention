import React, { useEffect, useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface TimePickerProps {
  current: string;
  onSelect: (time: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

type TimeState = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
const periods = ["AM", "PM"];

const TimePicker = ({
  current,
  onSelect,
  onClose,
  triggerRef,
}: TimePickerProps) => {
  const parseInit = (tStr: string): TimeState => {
    const match = /^(\d{1,2}):(\d{2})\s*([ap]m)$/i.exec(
      String(tStr || "").trim(),
    );

    if (match) {
      let h = parseInt(match[1], 10);
      if (h < 1 || h > 12) h = 9;
      let m = parseInt(match[2], 10);
      if (isNaN(m) || m < 0 || m > 59) m = 0;
      const p = match[3].toUpperCase() as "AM" | "PM";
      return {
        hour: h,
        minute: m,
        period: p,
      };
    }

    return {
      hour: 9,
      minute: 0,
      period: "AM",
    };
  };

  const [timeState, setTimeState] = useState<TimeState>(() =>
    parseInit(current),
  );
  const [openUpwards, setOpenUpwards] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleApply = () => {
    const formatted = `${timeState.hour}:${String(timeState.minute).padStart(2, "0")} ${timeState.period.toLowerCase()}`;

    onSelect(formatted);
    onClose();
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;

    if (!trigger || !popover) return;

    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    setOpenUpwards(spaceBelow < popoverRect.height && spaceAbove > spaceBelow);
  }, [triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, triggerRef]);
  
  return (
    <div
      ref={popoverRef}
      className={`absolute right-0 z-50 w-56 rounded-xl border border-white/10 bg-[#1e1e2e] p-3 shadow-xl ${
        openUpwards ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-white">Select Time</span>

        <button
          type="button"
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RiCloseLine className="text-base" />
        </button>
      </div>

      {/* Time Selectors */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {/* Hour */}
        <select
          value={timeState.hour}
          onChange={(e) =>
            setTimeState((prev) => ({
              ...prev,
              hour: Number(e.target.value),
            }))
          }
          className="w-full bg-white/[0.06] border border-white/10 rounded-md px-1.5 py-1.5 text-[11px] text-white outline-none cursor-pointer"
        >
          {hours.map((hour) => (
            <option className="bg-[#1e1e2e] text-white" key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        {/* Minute */}
        <select
          value={timeState.minute}
          onChange={(e) =>
            setTimeState((prev) => ({
              ...prev,
              minute: Number(e.target.value),
            }))
          }
          className="w-full bg-white/[0.06] border border-white/10 rounded-md px-1.5 py-1.5 text-[11px] text-white outline-none cursor-pointer"
        >
          {minutes.map((minute) => (
            <option
              className="bg-[#1e1e2e] text-white"
              key={minute}
              value={minute}
            >
              {String(minute).padStart(2, "0")}
            </option>
          ))}
        </select>

        {/* AM / PM */}
        <select
          value={timeState.period}
          onChange={(e) =>
            setTimeState((prev) => ({
              ...prev,
              period: e.target.value as "AM" | "PM",
            }))
          }
          className="w-full bg-white/[0.06] border border-white/10 rounded-md px-1.5 py-1.5 text-[11px] text-white outline-none cursor-pointer"
        >
          {periods.map((period) => (
            <option
              className="bg-[#1e1e2e] text-white"
              key={period}
              value={period}
            >
              {period}
            </option>
          ))}
        </select>
      </div>

      {/* Apply */}
      <button
        type="button"
        onClick={handleApply}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md py-1.5 transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

export default TimePicker;
