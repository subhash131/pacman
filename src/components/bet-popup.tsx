"use client";
import { useStateContext } from "@/providers/state-provider";
import React from "react";

const BetPopup = () => {
  const { betCardActive, setBetCardActive } = useStateContext();
  return (
    <div
      className={`${
        betCardActive ? "top-0" : "top-[100vh]"
      } absolute top-0 left-0 size-full flex items-center justify-center transition-all duration-500`}
    >
      <div
        className={`z-50 bg-neutral-700 text-white p-4 w-[70%] h-[80%] rounded-xl `}
        onClick={() => {
          setBetCardActive(false);
        }}
      >
        close
      </div>
    </div>
  );
};

export default BetPopup;
