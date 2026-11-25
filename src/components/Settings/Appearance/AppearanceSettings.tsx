import WallpaperSettings from "./WallpaperSettings";
import ThemeSettings from "./ThemeSettings";
import TypographySettings from "./TypographySettings";
import { Wallpaper } from "../settings.types";

type AppearanceSettingsProps = {
  wallpaper: Wallpaper;
  onWallpaperPick: (fileOrWallpaper: File | Wallpaper) => void;
  onWallpaperReset: () => void;
};

const AppearanceSettings = ({
  wallpaper,
  onWallpaperPick,
  onWallpaperReset,
}: AppearanceSettingsProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="pb-5">
        <h3 className="font-bold">Appearance & Theme</h3>
      </div>
      <div>
        <WallpaperSettings
        wallpaper={wallpaper}
        onWallpaperPick={onWallpaperPick}
        onWallpaperReset={onWallpaperReset}
      />
      </div>





      {/* <ThemeSettings />
      <TypographySettings /> */}
    </div>
  );
};

export default AppearanceSettings;
