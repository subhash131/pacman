"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import { useReadContract } from "wagmi";
import { IoIosLogOut } from "react-icons/io";
import { getBalance } from "@wagmi/core";

import { config } from "@/providers/config";
import abi from "../../abi/abi.json";

const Connect = dynamic(() => import("./connect").then((res) => res.Connect));

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export function Profile() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance } = useBalance({ address });

  const { data, error, isError } = useReadContract({
    abi,
    address:
      (contractAddress && `0x${contractAddress}`) ||
      "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
    functionName: "gameOwner",
    config,
  });

  return (
    <>
      {!isConnected ? (
        <Connect />
      ) : (
        <div className="flex gap-2">
          <button
            className="relative p-2 text-base font-semibold flex items-center justify-center bg-neutral-200 rounded-md group/button"
            onClick={() => {
              connector?.disconnect();
            }}
          >
            <span className="absolute mt-20 font-normal text-sm bg-neutral-100 px-4 py-2 border rounded-lg group-hover/button:block hidden delay-300 transition-all">
              <IoIosLogOut className="inline-block mr-1" strokeWidth={5} />
              Logout
            </span>
            <span className="bg-white px-2 rounded-lg mr-2">
              {balance && `${balance.formatted.slice(0, 6)} ${balance.symbol}`}
            </span>
            {`${address?.substring(0, 4)}...${address?.substring(
              address.length - 3
            )}`}
          </button>
        </div>
      )}
      <div>data:{(data as string) && (data as string)}</div>
    </>
  );
}
