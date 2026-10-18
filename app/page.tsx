"use client";
import Clock from "@/src/components/Clock/Clock";
import Dashboard from "@/src/components/Dashboard/Dashboard";
import SettingsButton from "@/src/components/SettingsButton/SettingsButton";
import Shortcuts from "@/src/components/Shortcuts/Shortcuts";
import StartButton from "@/src/components/StartButton/StartButton";

import React, { useState } from "react";


const page = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  return (
    <main
      style={{ backgroundImage: "url('/default-wallpaper.jpg')" }}
      className="h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat relative"
    >
      <Clock isDashboard={showDashboard}/>
      {showDashboard ? (
        <Dashboard onClose={() => setShowDashboard(false)}/>
      ) : (
        <>
          <Shortcuts />
          <StartButton onStart={()=> setShowDashboard(true)}/>
          <SettingsButton />
        </>
      )}
    </main>
  );
};

export default page;
