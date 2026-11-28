import WallpaperSettings from "./WallpaperSettings";
import ThemeSettings from "./ThemeSettings";
import TypographySettings from "./TypographySettings";
import { Wallpaper } from "../settings.types";

type AppearanceSettingsProps = {
  wallpaper: Wallpaper;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
  activeTheme: string;
  onThemeChange: (themeId: string) => void;
};

const AppearanceSettings = ({
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
  activeTheme,
  onThemeChange
}: AppearanceSettingsProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="pb-5">
        <h3 className="font-bold">Appearance & Theme</h3>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <WallpaperSettings
            wallpaper={wallpaper}
            onWallpaperPick={onWallpaperPick}
            onWallpaperReset={onWallpaperReset}
          />
        </div>
        <div>
          <ThemeSettings 
          activeTheme={activeTheme}
          onThemeChange={onThemeChange}
          
          />
        </div>
      </div>

      {/* <TypographySettings /> */}
    </div>
  );
};

export default AppearanceSettings;
