import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SettingsTab } from "./settings.types";
import SettingsSidebar from "./SettingsSidebar";
import AppearanceSettings from "./Appearance/AppearanceSettings";
import DashboardSettings from "./DashboardSettings";
import IslandSettings from "./IslandSettings";
import ShortcutsSettings from "./ShortcutsSettings";
import TimeBoxingSettings from "./TimeBoxingSettings";
import BackupSettings from "./BackupSettings";
import { Wallpaper } from "./settings.types";
import { FiSettings } from "react-icons/fi";

type SettingsModalProps = {
  onClose: () => void;
  wallpaper: Wallpaper;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
  activeTheme: string;
  onThemeChange: (themeId: string) => void;
};

const settingsComponents: Record<
  Exclude<SettingsTab, "appearance">,
  React.ComponentType
> = {
  dashboard: DashboardSettings,
  island: IslandSettings,
  shortcuts: ShortcutsSettings,
  timeboxing: TimeBoxingSettings,
  backup: BackupSettings,
};

const SettingsModal = ({
  onClose,
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
  activeTheme,
  onThemeChange
}: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className=" flex flex-col relative h-[80vh] w-[85vw] max-w-5xl rounded-2xl figma-glass-static text-white"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="w-full border-b border-white/10 p-4 flex items-center justify-between flex-row-reverse z-50">
          <button
            onClick={onClose}
            className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full figma-glass-static text-white"
            aria-label="Close settings"
          >
            <IoMdClose size={16} />
          </button>

          <div className="flex flex-row-reverse gap-2 items-center">
          <h2 id="settings-title" className="text-lg font-bold select-none">
            Settings
          </h2>
          <div className="w-9 h-9 flex items-center justify-center rounded-full figma-glass-static text-white"><FiSettings /></div>
          </div>
        </div>

        <div className="mt-0 flex min-h-0 flex-1">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="min-w-0 flex-1 overflow-y-auto px-15 py-7 scrollbar-hide">
            {activeTab === "appearance" ? (
              <AppearanceSettings
                wallpaper={wallpaper}
                onWallpaperPick={onWallpaperPick}
                onWallpaperReset={onWallpaperReset}
                activeTheme={activeTheme}
                onThemeChange={onThemeChange}
              />
            ) : (
              (() => {
                const ActiveSettingsComponent = settingsComponents[activeTab];
                return <ActiveSettingsComponent />;
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
