import React, { useMemo, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

type IconPickerProps = {
  onClose: () => void;
  onSelect: (icon: string) => void;
  selectedIcon: string;
};

const ICONS = [
  { icon: "☀️", name: "Sun", category: "Nature" },
  { icon: "🌙", name: "Moon", category: "Nature" },
  { icon: "⭐", name: "Star", category: "Nature" },
  { icon: "🔥", name: "Fire", category: "Nature" },
  { icon: "🌈", name: "Rainbow", category: "Nature" },
  { icon: "🌻", name: "Sunflower", category: "Nature" },

  { icon: "📱", name: "Phone", category: "Objects" },
  { icon: "💻", name: "Laptop", category: "Objects" },
  { icon: "⌚", name: "Watch", category: "Objects" },
  { icon: "🎧", name: "Headphones", category: "Objects" },

  { icon: "🏃", name: "Running", category: "Activities" },
  { icon: "⚽", name: "Football", category: "Activities" },
];

const IconPicker = ({ onClose, onSelect, selectedIcon}: IconPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customIcon, setCustomIcon] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredIcons = useMemo(() => {
    return ICONS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddCustomIcon = () => {
    if (!customIcon.trim()) return;

    onSelect(customIcon.trim());
    onClose();
    setCustomIcon("");
  };
  return (
    <div className="absolute right-0 top-full z-50 w-65 h-[300px] rounded-2xl p-3 flex flex-col gap-2 border border-white/15 bg-slate-900 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[10px] uppercase tracking-wider font-bold">
          Select Icon
        </span>

        <button
          type="button"
          onClick={onClose}
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
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search icons..."
          className="w-full h-8 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1 overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-2 py-1 rounded-md text-[10px] font-bold ${
            activeCategory === "All"
              ? "bg-blue-500 text-white"
              : "text-slate-400 hover:bg-white/10"
          } whitespace-nowrap`}
        >
          All
        </button>

        <button
          onClick={() => setActiveCategory("Nature")}
          className={`px-2 py-1 rounded-md text-[10px] font-medium ${
            activeCategory === "Nature"
              ? "bg-blue-500 text-white"
              : "text-slate-400 hover:bg-white/10"
          } whitespace-nowrap`}
        >
          Nature
        </button>

        <button
          onClick={() => setActiveCategory("Objects")}
          className={`px-2 py-1 rounded-md text-[10px] font-medium ${
            activeCategory === "Objects"
              ? "bg-blue-500 text-white"
              : "text-slate-400 hover:bg-white/10"
          } whitespace-nowrap`}
        >
          Objects
        </button>

        <button
          onClick={() => setActiveCategory("Activities")}
          className={`px-2 py-1 rounded-md text-[10px] font-medium ${
            activeCategory === "Activities"
              ? "bg-blue-500 text-white"
              : "text-slate-400 hover:bg-white/10"
          } whitespace-nowrap`}
        >
          Activities
        </button>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-6 gap-1 overflow-y-auto flex-1 content-start">
        {filteredIcons.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
            onSelect(item.icon);
            onClose();
            }}
            className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-colors ${
              selectedIcon === item.icon
                ? "bg-blue-500 text-white"
                : "hover:bg-white/10"
            }`}
          >
            {item.icon}
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
            value={customIcon}
            onChange={(e) => {
              setCustomIcon(e.target.value);
            }}
            placeholder="Paste emoji or icon..."
            className="flex-1 min-w-0 h-8 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleAddCustomIcon}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCustomIcon();
              }
            }}
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
