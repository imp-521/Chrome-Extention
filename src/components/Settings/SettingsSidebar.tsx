
import React from "react";
import { SettingsTab } from "./settings.types";

type SettingsSidebarProps = {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
};

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "appearance", label: "Appearance" },
  { id: "dashboard", label: "Dashboard" },
  { id: "island", label: "Island" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "timeboxing", label: "Time Boxing" },
  { id: "backup", label: "Backup" },
];

const SettingsSidebar = ({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) => {
  return (
    <aside className="w-60 border-r border-white/10 p-4">
      <h3 className="mb-4 text-sm font-semibold text-white/50">
        SETTINGS
      </h3>

      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-lg px-3 py-2 text-left text-sm transition ${
              activeTab === tab.id
                ? "bg-white/15 text-white"
                : "text-white/60 hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
