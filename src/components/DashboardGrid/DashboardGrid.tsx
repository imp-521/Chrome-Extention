"use client";
import React, { useEffect, useRef, useState } from "react";
import Pomodoro from "../Pomodoro/Pomodoro";
import WaterReminder from "../WaterReminder/WaterReminder";

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
  waterReminder : WaterReminder,
};

// this is a fucntion that we use it  for finding out that the device is desktop or laptop
const getDeviceTier = (width: number) => {
  return width >= 1600 ? "desktop" : "laptop";
};

// using this function we always keep the cols in the right regin
const getWidgetCols = (widget: Widget) => {
  return Math.max(widget.minCols, Math.min(widget.maxCols, widget.cols));
};

// this function has the same work as the privous function but this is for rows
const getWidgetRows = (widget: Widget) => {
  return Math.max(widget.minRows, Math.min(widget.maxRows, widget.rows));
};

// with using this function we regocnize that this place is stuibale or not
const canPlace = (
  widget: Widget,
  col: number,
  row: number,
  widgets: Widget[],
  grid: { cols: number; rows: number },
): boolean => {
  const cols = getWidgetCols(widget);
  const rows = getWidgetRows(widget);

  if (
    col < 1 ||
    row < 1 ||
    col + cols - 1 > grid.cols ||
    row + rows - 1 > grid.rows
  ) {
    return false;
  }

  return widgets.every((other) => {
    if (other.id === widget.id) return true;

    const otherCols = getWidgetCols(other);
    const otherRows = getWidgetRows(other);

    const horizontalOverlap =
      col < other.col + otherCols && other.col < col + cols;

    const verticalOverlap =
      row < other.row + otherRows && other.row < row + rows;

    return !(horizontalOverlap && verticalOverlap);
  });
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

  // saving what kind of screen we are using
  const [widgets, setWidgets] = useState<Widget[]>(() =>
    grid.tier === "desktop" ? desktopWidgets : laptopWidgets,
  );

  // with useing this state we are saving the widgetId that we have selcted for dragging
  const [draggingWidgetId, setDraggingWidgetId] = useState<WidgetId | null>(
    null,
  );

  const draggingWidget = widgets.find(
    (widget) => widget.id === draggingWidgetId,
  );

  // in this state we are saving the position of mouse at the end of the dragging
  const [targetPosition, setTargetPosition] = useState<{
    col: number;
    row: number;
  } | null>(null);

  const isTargetValid =
    targetPosition !== null &&
    draggingWidget !== undefined &&
    canPlace(
      draggingWidget,
      targetPosition.col,
      targetPosition.row,
      widgets,
      grid,
    );

  const gridRef = useRef<HTMLDivElement>(null);
  // update the screen with changing the tier
  useEffect(() => {
    setWidgets(grid.tier === "desktop" ? desktopWidgets : laptopWidgets);
  }, [grid.tier]);

  const moveWidget = (
    widgetId: WidgetId,
    newCol: number,
    newRow: number,
  ): void => {
    const widget = widgets.find((item) => item.id === widgetId);

    if (!widget) return;
    if (!widget.draggable) return;

    const isValid = canPlace(widget, newCol, newRow, widgets, grid);

    if (!isValid) return;

    setWidgets((currentWidgets) =>
      currentWidgets.map((item) =>
        item.id === widgetId ? { ...item, col: newCol, row: newRow } : item,
      ),
    );
  };

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
      ref={gridRef}
      onMouseMove={(event) => {
        if (draggingWidgetId === null) return;

        const rectElement = gridRef.current;
        if (!rectElement) return;

        const rect = rectElement.getBoundingClientRect();
        const styles = window.getComputedStyle(rectElement);

        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingTop = parseFloat(styles.paddingTop);

        const gapX = parseFloat(styles.columnGap);
        const gapY = parseFloat(styles.rowGap);

        const mouseX = event.clientX - rect.left - paddingLeft;
        const mouseY = event.clientY - rect.top - paddingTop;

        const contentWidth =
          rect.width - paddingLeft - parseFloat(styles.paddingRight);

        const contentHeight =
          rect.height - paddingTop - parseFloat(styles.paddingBottom);

        const cellWidth = (contentWidth - gapX * (grid.cols - 1)) / grid.cols;
        const cellHeight = (contentHeight - gapY * (grid.rows - 1)) / grid.rows;

        const rawCol = Math.floor(mouseX / (cellWidth + gapX)) + 1;
        const rawRow = Math.floor(mouseY / (cellHeight + gapY)) + 1;

        const col = Math.max(1, Math.min(grid.cols, rawCol));
        const row = Math.max(1, Math.min(grid.rows, rawRow));

        setTargetPosition({ col, row });
      }}
      onMouseUp={() => {
        if (draggingWidgetId !== null && targetPosition !== null) {
          moveWidget(draggingWidgetId, targetPosition.col, targetPosition.row);
        }

        setDraggingWidgetId(null);
        setTargetPosition(null);
      }}
      className="w-full h-full grid gap-3 overflow-auto p-6"
    >
      {widgets.map((widget) => {
        const Component = widgetsComponents[widget.id];

        // in this Variable we are saving the amount of cols that we have permition
        const safeCols = getWidgetCols(widget);

        // in this variable we are saving the last col that we can start from
        const maxStartCol = grid.cols - safeCols + 1;

        // in this variable we are checking if the natural amount of col was higher than the mount we have permission we stop it
        const safeCol = Math.min(widget.col, maxStartCol);

        const safeRows = getWidgetRows(widget);
        const maxStartRow = grid.rows - safeRows + 1;
        const safeRow = Math.min(widget.row, maxStartRow);
        return (
          <div
            key={widget.id}
            style={{
              gridColumn: `${safeCol} / span ${safeCols}`,
              gridRow: `${safeRow} / span ${safeRows}`,
            }}
            // onMouseDown={() => {
            //   setDraggingWidgetId(widget.id);
            // }}
            className=""
          >
            {Component ? <Component /> : <h2>{widget.title}</h2>}
          </div>
        );
      })}

      {/* {targetPosition !== null && draggingWidget && (
        <div
          style={{
            gridColumn: `${targetPosition.col} / span ${getWidgetCols(draggingWidget)}`,
            gridRow: `${targetPosition.row} / span ${getWidgetRows(draggingWidget)}`,
          }}
          className={`${
            isTargetValid
              ? "bg-green-400/30 border-2 border-green-400"
              : "bg-red-400/30 border-2 border-red-400"
          } rounded-lg pointer-events-none`}
        />
      )} */}
    </div>
  );
};

export default DashboardGrid;
