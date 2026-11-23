"use client";
import Clock from "@/src/components/Clock/Clock";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import SettingsModal from "@/src/components/Settings/SettingsModal";
import SettingsButton from "@/src/components/SettingsButton/SettingsButton";
import Shortcuts from "@/src/components/Shortcuts/Shortcuts";
import StartButton from "@/src/components/StartButton/StartButton";
import React, { useState } from "react";

type Wallpaper = {
  type: "image" | "video";
  dataUrl: string;
  name: string;
};

const page = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  const handleWallpaperPick = (fileOrWallpaper: File | Wallpaper) => {
    if (fileOrWallpaper instanceof File) {
      const reader = new FileReader();

      reader.onload = () => {
        setWallpaper({
          type: fileOrWallpaper.type.startsWith("video/") ? "video" : "image",
          dataUrl: String(reader.result),
          name: fileOrWallpaper.name,
        });
      };

      reader.readAsDataURL(fileOrWallpaper);
      return;
    }

    setWallpaper(fileOrWallpaper);
  };

  const handleWallpaperReset = () => {
    setWallpaper(null);
  };

  return (
    <main
      style={{ backgroundImage: "url('/default-wallpaper.jpg')" }}
      className="h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat relative"
    >
      <Clock isDashboard={showDashboard} />
      {showDashboard ? (
        <Dashboard onClose={() => setShowDashboard(false)} />
      ) : (
        <>
          <Shortcuts />
          <StartButton onStart={() => setShowDashboard(true)} />
          <SettingsButton onClick={() => setShowSettings(true)} />
          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </>
      )}
    </main>
  );
};

export default page;
