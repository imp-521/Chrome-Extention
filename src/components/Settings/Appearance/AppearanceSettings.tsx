import WallpaperSettings from "./WallpaperSettings";
import ThemeSettings from "./ThemeSettings";
import TypographySettings from "./TypographySettings";
import { Wallpaper } from "../settings.types";

type AppearanceSettingsProps = {
  wallpaper: Wallpaper | null;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
};

const AppearanceSettings = ({
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
}: AppearanceSettingsProps) => {
  return (
    <div className="space-y-8">
      <WallpaperSettings
        wallpaper={wallpaper}
        onWallpaperPick={onWallpaperPick}
        onWallpaperReset={onWallpaperReset}
      />
      <ThemeSettings />
      <TypographySettings />
    </div>
  );
};

export default AppearanceSettings;
