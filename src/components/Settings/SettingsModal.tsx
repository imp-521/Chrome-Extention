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

type SettingsModalProps = {
  onClose: () => void;
  wallpaper: Wallpaper | null;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
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
}: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className=" flex flex-col relative h-[80vh] w-[85vw] max-w-5xl rounded-2xl bg-[#1e1e1e] p-6 text-white"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer"
            aria-label="Close settings"
          >
            <IoMdClose size={24} />
          </button>

          <h2 id="settings-title" className="text-xl font-bold">
            Settings
          </h2>
        </div>

        <div className="mt-6 flex min-h-0 flex-1">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="min-w-0 flex-1 overflow-y-auto p-4">
            {activeTab === "appearance" ? (
              <AppearanceSettings
                wallpaper={wallpaper}
                onWallpaperPick={onWallpaperPick}
                onWallpaperReset={onWallpaperReset}
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
