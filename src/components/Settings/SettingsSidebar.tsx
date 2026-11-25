import React from "react";
import { SettingsTab } from "./settings.types";
import {
  FiMonitor,
  FiGrid,
  FiLayers,
  FiCommand,
  FiClock,
  FiDatabase,
  FiGithub,
  FiMessageSquare,
  FiLinkedin,
} from "react-icons/fi";

type SettingsSidebarProps = {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
};

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "appearance", label: "Appearance & Theme", icon: FiMonitor },
  { id: "dashboard", label: "Dashboard", icon: FiGrid },
  { id: "island", label: "Island", icon: FiLayers },
  { id: "shortcuts", label: "Shortcuts", icon: FiCommand },
  { id: "timeboxing", label: "Time Boxing", icon: FiClock },
  { id: "backup", label: "Backup", icon: FiDatabase },
];

const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  return (
    <aside className="w-60 border-r border-white/10 p-4 flex flex-col justify-between">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                activeTab === tab.id
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div className="flex items-center gap-2 flex-col">
        <div className="flex items-center w-full justify-between px-3 border-t border-white/10 px-4 pt-4">
          <a
            href="https://github.com/imp-521"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] text-white/85 cursor-pointer justify-center rounded-lg figma-glass-static w-21"
          >
            <FiGithub size={10} />
            Github
          </a>

          <a
            href="https://www.linkedin.com/in/afshinsohrabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] text-white/85 cursor-pointer justify-center rounded-lg figma-glass-static"
          >
            <FiLinkedin size={10} />
            LinkedIn
          </a>
        </div>
        <span className="block text-center text-[10px] text-white/35 tracking-wide">
          © 2026 · All rights reserved
        </span>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
