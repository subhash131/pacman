import React from "react";
import Canvas from "@/components/canvas";
import Help from "@/components/help";

const GamePage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Canvas />
      <Help />
    </div>
  );
};

export default GamePage;
