import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import type { IconType } from "react-icons";
import {
  RiBriefcaseLine,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiNewspaperLine,
} from "react-icons/ri";

type TabLink = {
  id: string;
  label: string;
  url: string;
};

type TabConfig = {
  id: string;
  title: string;
  icon: IconType;
  links: TabLink[];
};

const DEFAULT_TABS: TabConfig[] = [
  {
    id: "tab-1",
    title: "Daily Work & Productivity",
    icon: RiBriefcaseLine,
    links: [
      {
        id: "link-1-1",
        label: "Gmail",
        url: "https://mail.google.com",
      },
      {
        id: "link-1-2",
        label: "Google Calendar",
        url: "https://calendar.google.com",
      },
      {
        id: "link-1-3",
        label: "Notion",
        url: "https://www.notion.so",
      },
    ],
  },
  {
    id: "tab-2",
    title: "Developer Tools",
    icon: RiCodeSSlashLine,
    links: [
      {
        id: "link-2-1",
        label: "GitHub",
        url: "https://github.com",
      },
      {
        id: "link-2-2",
        label: "Stack Overflow",
        url: "https://stackoverflow.com",
      },
      {
        id: "link-2-3",
        label: "MDN Web Docs",
        url: "https://developer.mozilla.org",
      },
    ],
  },
  {
    id: "tab-3",
    title: "Design & Inspiration",
    icon: RiPaletteLine,
    links: [
      {
        id: "link-3-1",
        label: "Figma",
        url: "https://www.figma.com",
      },
      {
        id: "link-3-2",
        label: "Dribbble",
        url: "https://dribbble.com",
      },
      {
        id: "link-3-3",
        label: "Unsplash",
        url: "https://unsplash.com",
      },
    ],
  },
  {
    id: "tab-4",
    title: "News & Tech Reads",
    icon: RiNewspaperLine,
    links: [
      {
        id: "link-4-1",
        label: "Hacker News",
        url: "https://news.ycombinator.com",
      },
      {
        id: "link-4-2",
        label: "TechCrunch",
        url: "https://techcrunch.com",
      },
      {
        id: "link-4-3",
        label: "Medium",
        url: "https://medium.com",
      },
    ],
  },
];

const ImportantTabs = () => {
  const openTab = (tab: TabConfig) => {
    const links = Array.isArray(tab.links) ? tab.links : [];

    if (links.length === 0) return;

    links.forEach((link) => {
      if (link.url && link.url !== "https://") {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    });
  };

  const tabs = DEFAULT_TABS;
  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-3 text-white font-gilroy-medium w-full h-full select-none flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between z-10 relative shrink-0 mb-3">
        <div className="flex items-center gap-1.5 text-white/70 text-xs font-gilroy-medium cursor-grab active:cursor-grabbing select-none">
          <MdDragIndicator className="text-white/50 text-lg cursor-grab" />
          <span>Important Tabs</span>
        </div>
      </div>

      {/* Tabs List */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col justify-start gap-1.5 z-10 pr-0.5">
        {/* Single Tab */}
        {tabs.map((tab) => {
          const hasLinks = Array.isArray(tab.links) && tab.links.length > 0;
          return (
            <div
              key={tab.id}
              className="flex items-center justify-between gap-2.5 text-xs sm:text-sm py-0.5 cursor-pointer group"
            >
              {/* Tab Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-white/80 text-base shrink-0">
                  <tab.icon />
                </span>

                <span className="font-gilroy-medium text-xs sm:text-sm text-white/90 truncate">
                  {tab.title}
                </span>

                <span className="text-[10px] text-white/35 font-gilroy-medium shrink-0">
                  {tab.links.length}
                </span>
              </div>

              {/* Open Button */}
              <button
                disabled={!hasLinks}
                onClick={() => openTab(tab)}
                type="button"
                title={
                  hasLinks
                    ? `Open ${tab.links.length} links`
                    : "No links added yet"
                }
                className={`h-6 w-6 rounded-full bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white/80 group-hover:border border-white/20 shrink-0 cursor-pointer ${
                  !hasLinks ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <RiArrowRightSLine className="text-base" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImportantTabs;
