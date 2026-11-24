
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