"use client";
import React, { useEffect, useState } from "react";

type Weather = {
  temperature: number;
  weatherCode: number;
};

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const weatherCodeToEmoji = (weatherCode: number) => {
    switch (weatherCode) {
      case 0:
        return "☀️";

      case 1:
        return "🌤️";

      case 2:
        return "⛅";

      case 3:
        return "☁️";

      case 45:
      case 48:
        return "🌫️";

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return "🌦️";

      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return "🌧️";

      case 71:
      case 73:
      case 75:
      case 77:
        return "🌨️";

      case 80:
      case 81:
      case 82:
        return "🌦️";

      case 85:
      case 86:
        return "🌨️";

      case 95:
      case 96:
      case 99:
        return "⛈️";

      default:
        return "🌤️";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getWeather = async (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();

      setWeather({
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code,
      });
    } catch (error) {
      console.error("Weather unavailable:", error);
      setWeather(null);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      (error) => {
        const fallbackLatitude: number = 29.6103;
        const fallbackLongitude: number = 52.5311;
        getWeather(fallbackLatitude, fallbackLongitude);
      },
    );
  }, []);

  const clock = time
    ? `${time.getHours()} : ${time.getMinutes().toString().padStart(2, "0")}`
    : "";

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });
  const date = time
    ? `${time.getDate()} ${formatter.format(time).toUpperCase()}`
    : "";

  const yearFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
  });
  const dayAndYear = time ? yearFormatter.format(time) : "";

  return (
    <div className="flex items-start flex-col rounded-[26px] absolute left-5 bottom-5 select-none z-20">
      <div className="font-Gilory-Bold">
        <span className="text-slate-50 text-xl">{date}</span>
      </div>

      <div className="font-heathergreen text-[50vh] leading-[0.9]">
        <h1 className="m-0 relative -top-[0.07em]">{clock}</h1>
      </div>

      <div className="flex flex-row-reverse w-full items-center justify-between">
        <div className="font-Gilory-Bold flex gap-1">
          {weather && (
            <>
              <span>{weather && weatherCodeToEmoji(weather.weatherCode)}</span>
              <span className="text-slate-50">
                {Math.round(weather.temperature)}°C
              </span>
            </>
          )}
        </div>
        <div className="font-Gilory-medium">
          <span className="text-slate-50">{dayAndYear}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
