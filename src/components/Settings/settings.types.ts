
export type SettingsTab =
  | "appearance"
  | "dashboard"
  | "island"
  | "shortcuts"
  | "timeboxing"
  | "backup";


  export type Wallpaper = {
  type: "image" | "video";
  dataUrl: string;
  name: string;
};

export type UITheme = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  preview: string[];
  beta?: boolean;
};