"use client"
import React from 'react'
import Pomodoro from '../Pomodoro/Pomodoro'

const widgets = [
    {
    id: "timer",
    title: "Pomodoro",
    col: 1,
    row: 1,
    cols: 4,
    rows: 2,
  },
  {
    id: "water",
    title: "Water Reminder",
    col: 1,
    row: 3,
    cols: 4,
    rows: 2,
  },
  {
    id: "todo",
    title: "To-Do List",
    col: 5,
    row: 1,
    cols: 4,
    rows: 2,
  },
  {
    id: "important",
    title: "Important Tabs",
    col: 9,
    row: 1,
    cols: 3,
    rows: 2,
  },
  {
    id: "music",
    title: "Music Player",
    col: 5,
    row: 3,
    cols: 4,
    rows: 2,
  },
  {
    id: "timeboxing",
    title: "Time Boxing",
    col: 17,
    row: 1,
    cols: 5,
    rows: 4,
  },
  {
    id: "streak",
    title: "Activity Streak",
    col: 5,
    row: 5,
    cols: 15,
    rows: 2,
  }
]





const DashboardGrid = () => {
  return (
    <div style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }} className='w-full h-full grid auto-rows-[80px] gap-3 overflow-hidden p-6'>
        {widgets.map((widget)=>{
            return(
                <div key={widget.id} style={{
                  gridColumn: `${widget.col} / span ${widget.cols}`,
                  gridRow: `${widget.row} / span ${widget.rows}`}} className=''>
                   {widget.id === "timer" ? (<Pomodoro />) : (<h2>{widget.title}</h2>)}
                </div>
            )
        })}
    </div>
  )
}

export default DashboardGrid