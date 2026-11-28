import React from "react";
import { UI_THEMES } from "../../../Themes/index";

type ThemeSettingsProps = {
  activeTheme: string;
  onThemeChange: (themeId: string) => void;
};

const ThemeSettings = ({ activeTheme, onThemeChange }: ThemeSettingsProps) => {
  return (
    <section className="w-full flex flex-col gap-4 figma-glass-static rounded-2xl p-5 shadow-lg">
      <div>
        <h3 className="font-bold">Themes</h3>
        <p className="text-sm text-white/50">
          Choose a theme to customize your experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {UI_THEMES.map((theme) => (
          <div
            onClick={() => onThemeChange(theme.id)}
            key={theme.id}
            className={`theme-card rounded-xl p-3 cursor-pointer transition-all duration-300 ${
              activeTheme === theme.id
                ? "bg-slate-800/80"
                : ""
            }`}
          >
            <img
              src={theme.image}
              alt={theme.name}
              className="w-full h-28 object-cover rounded-lg"
            />

            <div className="mt-3 flex items-center justify-between">
              <h4 className="font-semibold text-sm">{theme.name}</h4>

              {theme.beta && (
                <span className="text-xs text-yellow-400">Beta</span>
              )}
            </div>

            <p className="mt-1 text-xs text-white/50">{theme.description}</p>

            <div className="flex gap-1 mt-3">
              {theme.preview.map((color, index) => (
                <div
                  key={index}
                  className="h-2 flex-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThemeSettings;
