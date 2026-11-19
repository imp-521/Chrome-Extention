import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const IconPicker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customIcon, setCustomIcon] = useState("");


  return (
    <div className="absolute left-0 top-full z-50 w-72 h-[300px] rounded-2xl p-3 flex flex-col gap-2 border border-white/15 bg-slate-900 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[10px] uppercase tracking-wider font-bold">
          Select Icon
        </span>

        <button
          type="button"
          className="h-6 w-6 rounded-lg border border-white/15 flex items-center justify-center"
        >
          <RiCloseLine className="text-base" />
        </button>
      </div>

      {/* Search */}
      <div className="relative shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value)}}
          placeholder="Search icons..."
          className="w-full h-8 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1 overflow-x-auto shrink-0">
        <button className="px-2 py-1 rounded-md text-[10px] font-bold bg-blue-500 text-white whitespace-nowrap">
          All
        </button>

        <button className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 hover:bg-white/10 whitespace-nowrap">
          Nature
        </button>

        <button className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 hover:bg-white/10 whitespace-nowrap">
          Objects
        </button>

        <button className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 hover:bg-white/10 whitespace-nowrap">
          Activities
        </button>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-6 gap-1 overflow-y-auto flex-1 content-start">
        {[
          "☀️",
          "🌙",
          "⭐",
          "🔥",
          "🌈",
          "🌻",
          "🌲",
          "🌊",
          "🍀",
          "🌸",
          "⚡",
          "❄️",
        ].map((icon, index) => (
          <button
            key={index}
            type="button"
            className="aspect-square rounded-lg flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Custom Icon */}
      <div className="shrink-0 border-t border-white/10 pt-2">
        <span className="block mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Custom Icon
        </span>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Paste emoji or icon..."
            className="flex-1 min-w-0 h-8 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            className="h-8 px-3 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
