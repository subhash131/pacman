"use client";
import { useStateContext } from "@/providers/state-provider";
import React from "react";
import { IoClose } from "react-icons/io5";

const BetPopup = () => {
  const { betCardActive, setBetCardActive } = useStateContext();
  return (
    <div
      className={`${
        betCardActive ? "top-0" : "top-[100vh]"
      } absolute top-0 left-0 size-full flex items-center justify-center transition-all duration-500`}
    >
      <div
        className={`z-50 bg-neutral-700 text-white px-4 w-[70%] h-[80%] rounded-xl `}
      >
        <div className="w-full h-12 items-center justify-end flex ">
          <button
            onClick={() => {
              setBetCardActive(false);
            }}
          >
            <IoClose strokeWidth={2} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetPopup;
