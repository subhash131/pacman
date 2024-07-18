"use client";
import React, { useEffect } from "react";
import { useStateContext } from "@/providers/state-provider";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";

import { useAccount, useBalance } from "wagmi";

const Connect = dynamic(() =>
  import("./wallet-connect").then((res) => res.Connect)
);

export function Navbar() {
  const { address, isConnected, connector } = useAccount();
  const { setWalletBalance, setBetCardActive } = useStateContext();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    if (!isConnected) setBetCardActive(false);
  }, [isConnected]);

  useEffect(() => {
    if (balance) setWalletBalance(balance.formatted);
  }, [balance]);

  return (
    <div className="w-screen h-[4.5rem] p-4 flex px-10 justify-between">
      <div className="text-white font-bold text-xl flex gap-2 items-center jc">
        <Image
          src="/icon.png"
          width={10}
          height={10}
          alt="icon"
          className="size-7"
          draggable={false}
        />
        <h1>BetX</h1>
      </div>
      {!isConnected ? (
        <Connect />
      ) : (
        <div className="flex gap-2">
          <button
            className="relative p-2 text-base font-semibold flex items-center justify-center bg-neutral-700 text-white rounded-md group/button"
            onClick={() => {
              connector?.disconnect();
            }}
          >
            <span className="absolute mt-20 font-normal text-sm text-white  bg-neutral-700 px-4 py-2  rounded-lg group-hover/button:block hidden delay-300 transition-all">
              <IoIosLogOut
                className="inline-block mr-1"
                strokeWidth={5}
                size={18}
              />
              Logout
            </span>
            <span className="bg-white px-2 rounded-lg mr-2 text-black ">
              {balance
                ? `${balance.formatted.slice(0, 6)} ${balance.symbol}`
                : "0.0"}
            </span>
            {`${address?.substring(0, 4)}...${address?.substring(
              address.length - 3
            )}`}
          </button>
        </div>
      )}
    </div>
  );
}
