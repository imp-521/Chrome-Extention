import React, { useState } from "react";

interface TimePickerProps {
  current: string;
  onSelect: (time: string) => void;
  onClose: () => void;
}

const TimePicker = ({ current, onSelect, onClose }: TimePickerProps) => {
  const [timeState, setTimeState] = useState({
    hour: 9,
    minute: 0,
    period: "AM",
  });

  const parseInit = (tStr: string) => {
    const match = /^(\d{1,2}):(\d{2})\s*([ap]m)$/i.exec(
      String(tStr || "").trim(),
    );

    if (match) {
      let h = parseInt(match[1], 10);

      if (h < 1 || h > 12) h = 9;

      let m = parseInt(match[2], 10);

      if (isNaN(m) || m < 0 || m > 59) m = 0;

      const p = match[3].toUpperCase();

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

  return <div>TimePicker</div>;
};

export default TimePicker;
