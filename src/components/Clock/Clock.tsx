"use client";
import React, { useEffect, useState } from "react";

const Clock = () => {

  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log(position);
    })
  },[])
  

 const clock = time ? `${time.getHours()} : ${time.getMinutes().toString().padStart(2, "0")} : ${time.getSeconds().toString().padStart(2, "0")}` : "";


return (
    <div>
      {clock}
    </div>
  )
};

export default Clock;
