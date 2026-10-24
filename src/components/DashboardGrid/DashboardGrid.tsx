"use client";
import React, { useEffect, useState } from "react";
import Pomodoro from "../Pomodoro/Pomodoro";

type WidgetId =
  | "timer"
  | "waterReminder"
  | "todo"
  | "importantTabs"
  | "songPlayer"
  | "timeBoxing"
  | "streakGrid";

type Widget = {
  id: WidgetId;
  title: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
  minCols: number;
  maxCols: number;
  minRows: number;
  maxRows: number;
  resizable: boolean;
  draggable: boolean;
};

const laptopWidgets: Widget[] = [
  {
    id: "timer",
    title: "Pomodoro",
    col: 1,
    row: 1,
    cols: 4,
    rows: 2,
    minCols: 2,
    maxCols: 6,
    minRows: 1,
    maxRows: 4,
    resizable: true,
    draggable: true,
  },
  {
    id: "waterReminder",
    title: "Water Reminder",
    col: 1,
    row: 3,
    cols: 4,
    rows: 2,
    minCols: 2,
    maxCols: 6,
    minRows: 1,
    maxRows: 4,
    resizable: true,
    draggable: true,
  },
  {
    id: "todo",
    title: "To-Do List",
    col: 5,
    row: 1,
    cols: 3,
    rows: 2,
    minCols: 2,
    maxCols: 5,
    minRows: 2,
    maxRows: 6,
    resizable: true,
    draggable: true,
  },
  {
    id: "importantTabs",
    title: "Important Tabs",
    col: 8,
    row: 1,
    cols: 3,
    rows: 2,
    minCols: 2,
    maxCols: 5,
    minRows: 2,
    maxRows: 6,
    resizable: true,
    draggable: true,
  },
  {
    id: "songPlayer",
    title: "Music Player",
    col: 5,
    row: 3,
    cols: 5,
    rows: 2,
    minCols: 3,
    maxCols: 8,
    minRows: 1,
    maxRows: 5,
    resizable: true,
    draggable: true,
  },
  {
    id: "timeBoxing",
    title: "Time Boxing",
    col: 12,
    row: 1,
    cols: 4,
    rows: 4,
    minCols: 3,
    maxCols: 7,
    minRows: 2,
    maxRows: 10,
    resizable: true,
    draggable: true,
  },
  {
    id: "streakGrid",
    title: "Activity Streak",
    col: 5,
    row: 5,
    cols: 11,
    rows: 2,
    minCols: 6,
    maxCols: 13,
    minRows: 1,
    maxRows: 5,
    resizable: true,
    draggable: true,
  },
];

const desktopWidgets: Widget[] = [
  {
    id: "timer",
    title: "Pomodoro",
    col: 1,
    row: 1,
    cols: 4,
    rows: 2,
    minCols: 2,
    maxCols: 6,
    minRows: 1,
    maxRows: 4,
    resizable: true,
    draggable: true,
  },
  {
    id: "waterReminder",
    title: "Water Reminder",
    col: 1,
    row: 3,
    cols: 4,
    rows: 2,
    minCols: 2,
    maxCols: 6,
    minRows: 1,
    maxRows: 4,
    resizable: true,
    draggable: true,
  },
  {
    id: "todo",
    title: "To-Do List",
    col: 5,
    row: 1,
    cols: 4,
    rows: 2,
    minCols: 2,
    maxCols: 5,
    minRows: 2,
    maxRows: 6,
    resizable: true,
    draggable: true,
  },
  {
    id: "importantTabs",
    title: "Important Tabs",
    col: 9,
    row: 1,
    cols: 3,
    rows: 2,
    minCols: 2,
    maxCols: 5,
    minRows: 2,
    maxRows: 6,
    resizable: true,
    draggable: true,
  },
  {
    id: "songPlayer",
    title: "Music Player",
    col: 5,
    row: 3,
    cols: 4,
    rows: 2,
    minCols: 3,
    maxCols: 8,
    minRows: 1,
    maxRows: 5,
    resizable: true,
    draggable: true,
  },
  {
    id: "timeBoxing",
    title: "Time Boxing",
    col: 17,
    row: 1,
    cols: 5,
    rows: 4,
    minCols: 3,
    maxCols: 7,
    minRows: 2,
    maxRows: 10,
    resizable: true,
    draggable: true,
  },
  {
    id: "streakGrid",
    title: "Activity Streak",
    col: 5,
    row: 5,
    cols: 15,
    rows: 3,
    minCols: 6,
    maxCols: 13,
    minRows: 1,
    maxRows: 5,
    resizable: true,
    draggable: true,
  },
];

// we defenited this object to connect each id to each component
const widgetsComponents: Partial<Record<WidgetId, React.ComponentType>> = {
  timer: Pomodoro,
};

// this is a fucntion that we use it  for finding out that the device is desktop or laptop
const getDeviceTier = (width: number) => {
  return width >= 1600 ? "desktop" : "laptop";
};


// using this function we always keep the cols in the right regin
const getWidgetCols = (widget: Widget) => {
  return Math.max(
    widget.minCols,
    Math.min(widget.maxCols, widget.cols)
  );
};

// in this function we can recive number of rows and cols and it despends on what divice we are using
const getDynamicGridSize = (
  width: number,
  height: number,
  tier: "laptop" | "desktop",
) => {
  const minCols = tier === "desktop" ? 16 : 15;

  const cols = Math.max(minCols, Math.floor((width - 32) / 80));
  const rows = Math.max(6, Math.floor((height - 96) / 100));

  return { rows, cols };
};

const DashboardGrid = () => {
  // in this state we are saving amount of rows and cols and also what device we are using
  const [grid, setGrid] = useState(() => {
    const width = typeof window === "undefined" ? 0 : window.innerWidth;
    const height = typeof window === "undefined" ? 0 : window.innerHeight;
    const tier = getDeviceTier(width);
    const size = getDynamicGridSize(width, height, tier);
    return {
      tier,
      cols: size.cols,
      rows: size.rows,
    };
  });

  const widgets = grid.tier === "desktop" ? desktopWidgets : laptopWidgets;

  // in this hook we update the amount of row and cols with resizing the screen and then we set it in the state
  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const tier = getDeviceTier(width);
      const size = getDynamicGridSize(width, height, tier);

      setGrid({
        tier,
        cols: size.cols,
        rows: size.rows,
      });
    };
    updateGrid();
    window.addEventListener("resize", updateGrid);

    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
      }}
      className="w-full h-full grid gap-3 overflow-auto p-6"
    >
      {widgets.map((widget) => {
        const Component = widgetsComponents[widget.id];
        return (
          <div
            key={widget.id}
            style={{
              gridColumn: `${widget.col} / span ${getWidgetCols(widget)}`,
              gridRow: `${widget.row} / span ${widget.rows}`,
            }}
            className=" "
          >
            {Component ? <Component /> : <h2>{widget.title}</h2>}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardGrid;
