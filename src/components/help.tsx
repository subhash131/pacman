"use client";
import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const Help = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={`absolute w-96 h-44 ${
        isActive ? "top-0" : "-top-[7rem]"
      }  right-10 rounded-b-xl duration-300 bg-neutral-700 text-white transition-all`}
    >
      <div className="w-full h-[calc(100%-4rem)] px-6 pt-4">
        <ul
          className="text-wrap text-xs w-fit flex flex-col gap-2"
          style={{ listStyleType: "disc" }}
        >
          <li>
            Use Arrows(&larr;,&uarr;,&rarr;,&darr;) or A,W,D,S keys to navigate.
          </li>
          <li>Press spacebar to stop.</li>
          <li>Consume larger pellets to frighten the enemies.</li>
          <li>You can consume enemies when they are frightened.</li>
          <li>Consume all pellets to win the game.</li>
        </ul>
      </div>
      <div
        className="h-16 w-full flex items-center justify-between px-8 cursor-pointer "
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        Help
        <MdOutlineArrowDropDownCircle
          className={`${
            isActive ? "rotate-180" : "rotate-0"
          } transition-all duration-500 delay-300`}
          size={22}
        />
      </div>
    </div>
  );
};

export default Help;
