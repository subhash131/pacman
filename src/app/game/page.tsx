"use client";
import React, { useEffect } from "react";
import Canvas from "@/components/canvas";
import Help from "@/components/help";
import { useStateContext } from "@/providers/state-provider";

const GamePage = () => {
  const { gameStatus } = useStateContext();
  useEffect(() => {
    
  }, [gameStatus]);
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Canvas />
      <Help />
    </div>
  );
};

export default GamePage;
