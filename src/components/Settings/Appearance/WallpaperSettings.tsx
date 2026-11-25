import React, { useRef, useState } from "react";
import type { Wallpaper } from "../settings.types";

type WallpaperSettingsProps = {
  wallpaper: Wallpaper;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
};

const WallpaperSettings = ({
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
}: WallpaperSettingsProps) => {
  const wallpaperInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="figma-glass-static rounded-2xl p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold text-white">Custom Wallpaper</h4>
          <p className="max-w-xl text-xs leading-5 text-white/55">
            Choose a wallpaper by uploading an image, dragging and dropping a
            file, or pasting an image URL.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
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

        <button
          onClick={() => wallpaperInputRef.current?.click()}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/15 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/25"
        >
          Upload Media
        </button>

        <button
          className="flex cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
          onClick={onWallpaperReset}
        >
          Reset Wallpaper
        </button>
      </div>

      <div className="mt-5">
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) {
              onWallpaperPick(file);
            }
          }}
          className="flex min-h-40 items-center justify-center overflow-hidden rounded-xl border-white/20 bg-black/10 transition hover:border-white/40 figma-glass-static"
        >
          {wallpaper ? (
            <div className="w-full overflow-hidden rounded-lg">
              {wallpaper.type === "image" ? (
                <img
                  src={wallpaper.dataUrl}
                  alt="Wallpaper preview"
                  className="max-h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={wallpaper.dataUrl}
                  className="max-h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-white/70">
                Drag & Drop your media here
              </p>
              <p className="text-xs text-white/40">
                or click Upload Media to browse files
              </p>
            </div>
          )}
          <div
            title={wallpaper.name}
            className="absolute bottom-3 left-3 max-w-[80%] truncate rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white/90 shadow-lg backdrop-blur-md"
          >
            {wallpaper.name}
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 items-center">
        <label
          htmlFor="wallpaper-url"
          className="text-xs font-medium text-white/75"
        >
          Image Link
        </label>

        <div className="flex items-center gap-2 flex-1">
          <input
            id="wallpaper-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-xs text-white outline-none placeholder:text-white/30 transition focus:border-white/30 focus:bg-black/20"
          />

          <button className="shrink-0 cursor-pointer rounded-lg border border-white/15 bg-white/15 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/25">
            Apply Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperSettings;
