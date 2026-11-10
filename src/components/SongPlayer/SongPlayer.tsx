import React, { useEffect, useRef, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import {
  RiPauseFill,
  RiPlayFill,
  RiRadioLine,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "react-icons/ri";

const stations = [
  {
    id: "lofi-zeno-lounge",
    name: "Lofi Study Lounge 24/7",
    provider: "Zeno Live Stream",
    streamUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    badge: "Lofi Study Lounge",
    gradient: "from-blue-900/60 via-cyan-950/50 to-slate-900/70",
  },
  {
    id: "lofi-laut-fm",
    name: "Lofi Hip Hop Radio 24/7",
    provider: "Laut FM Stream",
    streamUrl: "https://lofi.stream.laut.fm/lofi",
    badge: "24/7 Lofi Hip Hop",
    gradient: "from-purple-900/60 via-indigo-900/50 to-slate-900/70",
  },
  // {
  //   id: "chillhop-beats",
  //   name: "Chillhop Radio & Lofi Beats",
  //   provider: "Flux FM Stream",
  //   streamUrl: "https://streams.fluxfm.de/chillhop/mp3-320/stream.fluxfm.de/",
  //   badge: "Chillhop Beats",
  //   gradient: "from-amber-900/60 via-orange-950/50 to-slate-950/70",
  // },
  {
    id: "ambient-sleep-lofi",
    name: "Cozy Ambient Rain Lofi",
    provider: "Zeno Live Stream",
    streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv",
    badge: "Ambient Rain Lofi",
    gradient: "from-emerald-950/60 via-slate-900/60 to-purple-950/70",
  },
];

const SongPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);
  const activeStation = stations[stationIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  const nextStation = () => {
    setStationIndex((prevIndex) => {
      return (prevIndex + 1) % stations.length;
    });
  };

  const previousStation = () => {
    setStationIndex((prevIndex) => {
      return (prevIndex - 1 + stations.length) % stations.length;
    });
  };

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let cancelled = false;

  audio.pause();
  audio.src = activeStation.streamUrl;
  audio.load();

  if (isPlaying) {
    audio.play().catch((error) => {
      if (cancelled) return;

      if (error.name === "AbortError") return;

      console.error("Audio playback failed:", error);
      setIsPlaying(false);
    });
  }

  return () => {
    cancelled = true;
  };
}, [activeStation, isPlaying]);

  return (
    <div className="figma-glass-static rounded-[26px] px-4 py-3 text-white font-gilroy-medium w-full h-full select-none flex flex-col shadow-2xl relative overflow-hidden">
      <audio
        ref={audioRef}
        preload="none"
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onPause={() => setIsBuffering(false)}
        onError={() => {
          setIsBuffering(false);
          setIsPlaying(false);
        }}
      />

      {/* header */}
      <div className="w-full flex items-center justify-between relative z-10 mb-3">
        {/* left */}
        <div className="flex items-center gap-2" data-drag-handle>
          <MdDragIndicator className="text-white/50 text-xl cursor-grab" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              Lofi Radio
            </span>

            <span className="text-[10px] text-white/50 tracking-wider">
              24/7 LIVE STREAM
            </span>
          </div>
        </div>
        {/* right */}
        <div
          style={{ backgroundColor: "#0F172A" }}
          className="flex items-center gap-1.5 rounded-ful px-2.5 py-1 rounded-full"
        >
          <RiRadioLine
            className={`text-xs ${
              isBuffering
                ? "text-amber-400"
                : isPlaying
                  ? "text-green-400"
                  : "text-slate-400"
            }`}
          />
          <span
            className={`text-[10px] font-semibold tracking-wider ${
              isBuffering
                ? "text-amber-400"
                : isPlaying
                  ? "text-green-400"
                  : "text-slate-400"
            }`}
          >
            {isBuffering ? "BUFFERING" : isPlaying ? "LIVE" : "PAUSED"}
          </span>
        </div>
      </div>

      {/* main section of music player */}

      <div className="flex-1 w-full flex gap-3 relative z-10 min-h-0">
        {/* left */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-black/30 min-w-0">
          <div
            className={`absolute inset-0 bg-linear-to-br ${activeStation.gradient}`}
          />
          <img
            src="/song_album_cover.png"
            alt="Lofi Background"
            className="absolute inset-0 w-full h-full object-cover opacity-16"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-3 left-3 flex items-end gap-1 h-8">
            <span
              className={`w-1.5 bg-purple-300 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-9" : "h-3 opacity-40"
              }`}
            />
            <span
              className={`w-1.5 bg-indigo-300 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-7 delay-100" : "h-4 opacity-40"
              }`}
            />
            <span
              className={`w-1.5 bg-pink-300 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-10 delay-200" : "h-2 opacity-40"
              }`}
            />
            <span
              className={`w-1.5 bg-cyan-300 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-6 delay-75" : "h-4 opacity-40"
              }`}
            />
            <span
              className={`w-1.5 bg-purple-300 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-8 delay-150" : "h-3 opacity-40"
              }`}
            />
          </div>
        </div>

        {/* right */}
        <div className="w-[110px] shrink-0 flex flex-col items-center justify-center gap-2">
          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              {activeStation.name}
            </p>

            <p className="text-[10px] text-white/50 mt-1">
              {activeStation.provider}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={previousStation}
              className="text-white/70 hover:text-white"
            >
              <RiSkipBackFill className="text-lg" />
            </button>

            <button
              onClick={togglePlay}
              style={{ backgroundColor: "#0F172A" }}
              className="w-10 h-10 rounded-full text-white flex items-center justify-center"
            >
              {isPlaying ? (
                <RiPauseFill className="text-xl" />
              ) : (
                <RiPlayFill className="text-xl" />
              )}
            </button>

            <button
              onClick={nextStation}
              className="text-white/70 hover:text-white"
            >
              <RiSkipForwardFill className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
