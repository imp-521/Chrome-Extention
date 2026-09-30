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

    const response = await fetch(url);
    const data = await response.json();
    setWeather({
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
    });
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


  const date = time ? `${time.getMonth() + 1}/ ${time.getDate()}` : ""
  const formatter = new Intl.DateTimeFormat("en-US", { 
    month: "short"
  })
  formatter.format(new Date())

  return (
    <div className="flex flex-col w-full h-20 justify-center align-center">
      {clock}
      <div>
        {weather &&
          <>
           {Math.round(weather.temperature)}°C
          </>
        }
        {weather && weatherCodeToEmoji(weather.weatherCode)}
      </div>
    </div>
  );
};

export default Clock;
