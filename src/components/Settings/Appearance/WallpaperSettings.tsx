import React, { useRef } from "react";
import type { Wallpaper } from "../settings.types";

type WallpaperSettingsProps = {
  wallpaper: Wallpaper | null;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
};

const WallpaperSettings = ({
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
}: WallpaperSettingsProps) => {
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={wallpaperInputRef}
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            onWallpaperPick(file);
          }
        }}
      />

      <button onClick={() => wallpaperInputRef.current?.click()}>
        Upload Media
      </button>

      {wallpaper && (
        <div>
          {wallpaper.type === "image" ? (
            <img src={wallpaper.dataUrl} alt="Wallpaper preview" />
          ) : (
            <video src={wallpaper.dataUrl} controls />
          )}
        </div>
      )}
    </div>
  );
};

export default WallpaperSettings;
