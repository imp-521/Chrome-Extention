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
  const [wallpaper, setWallpaper] = useState<Wallpaper>({
    type: "image",
    dataUrl: "/default-wallpaper.jpg",
    name: "Default Wallpaper",
  });
  const [activeTheme, setActiveTheme] = useState("default");

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
    console.log("New wallpaper:", fileOrWallpaper);
    setWallpaper(fileOrWallpaper);
  };

  const handleWallpaperReset = () => {
    setWallpaper({
      type: "image",
      dataUrl: "/default-wallpaper.jpg",
      name: "Default Wallpaper",
    });
  };

  return (
    <main
      data-theme={activeTheme}
      style={{
        backgroundImage:
          wallpaper.type === "image" ? `url('${wallpaper.dataUrl}')` : "none",
      }}
      className="h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat relative"
    >
      {wallpaper.type === "video" && (
        <video
          src={wallpaper.dataUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
      )}

      <div className="relative z-10 h-full w-full">
        <Clock isDashboard={showDashboard} />
        {showDashboard ? (
          <Dashboard
            onClose={() => setShowDashboard(false)}
            onSettingsClick={() => setShowSettings(true)}
          />
        ) : (
          <>
            <Shortcuts />
            <StartButton onStart={() => setShowDashboard(true)} />
            <SettingsButton onClick={() => setShowSettings(true)} />
          </>
        )}

        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            wallpaper={wallpaper}
            onWallpaperPick={handleWallpaperPick}
            onWallpaperReset={handleWallpaperReset}
            activeTheme={activeTheme}
            onThemeChange={setActiveTheme}
          />
        )}
      </div>
    </main>
  );
};

export default page;
