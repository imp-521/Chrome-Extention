import WallpaperSettings from "./WallpaperSettings";
import ThemeSettings from "./ThemeSettings";
import TypographySettings from "./TypographySettings";

const AppearanceSettings = () => {
  return (
    <div className="space-y-8">
      <WallpaperSettings />
      <ThemeSettings />
      <TypographySettings />
    </div>
  );
};

export default AppearanceSettings;