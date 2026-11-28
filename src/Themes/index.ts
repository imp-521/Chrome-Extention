
import { UITheme } from "../components/Settings/settings.types";

export const UI_THEMES: UITheme[] = [
  {
    id: "default",
    name: "Default Glass",
    description:
      "Sleek glassmorphism backdrop with modern typography & clean cards",
    icon: "ri-sparkling-2-fill",
    image: "/default-wallpaper.jpg",
    preview: ["#7DD3FC", "#0EA5E9", "#0369A1", "#0C4A6E"],
  },
  {
    id: "manga",
    name: "Manga Style",
    description:
      "Black & white comic book layout, ink-bordered panels & speed-line styling",
    icon: "ri-book-2-line",
    image: "/wallpaperGreen.webp",
    preview: ["#DCEBC5", "#A8C686", "#6F9655", "#344B32"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    description:
      "Neon glow accents, corner bracket HUD frames, dark grid & Rajdhani font",
    icon: "ri-cpu-line",
    image: "/cyberpunk-wallpaper.png",
    preview: ["#FF0055", "#FF0080", "#990033", "#08020D"],
  },
  {
    id: "pixel",
    name: "CLI Terminal",
    description:
      "eDEX-UI sci-fi terminal interface with double-line borders, Share Tech Mono font & phosphor glow",
    icon: "ri-terminal-box-line",
    image: "/cli-wallpaper.jpg",
    preview: ["#00FF66", "#33FF88", "#003311", "#05100A"],
  },
  {
    id: "aurora",
    name: "Retro",
    description:
      "Analog neon nights, dark city lights and retro-futurist streets",
    icon: "ri-moon-foggy-line",
    image: "/retro-neon-noir-wallpaper.png",
    preview: ["#D4F7FF", "#F4689D", "#285873", "#0B1823"],
    beta: true,
  },
  {
    id: "ember",
    name: "Brutal",
    description:
      "Bold colors, sharp corners and graphic neo-brutalist panels",
    icon: "ri-shape-2-line",
    image: "/brutal-wallpaper.svg",
    preview: ["#FFE56B", "#F7B73A", "#D15A3A", "#1D1D1D"],
    beta: true,
  },
  {
    id: "botanical",
    name: "Painting",
    description:
      "Antique garden painting, soft parchment tones and botanical details",
    icon: "ri-leaf-line",
    image: "/botanical-painted-wallpaper.png",
    preview: ["#F3E6C8", "#C5B691", "#79805C", "#27382E"],
    beta: true,
  },
  {
    id: "obsidian",
    name: "Windows XP",
    description:
      "Classic gray windows, blue title bars and a sunny desktop",
    icon: "ri-windows-fill",
    image: "/xp-hills-wallpaper.png",
    preview: ["#F4F4F4", "#C0C0C0", "#555E9A", "#0A1A63"],
    beta: true,
  },
];
