"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import abi from "../../abi/abi.json";
import { config } from "@/providers/config";

const Connect = dynamic(() => import("./connect").then((res) => res.Connect));

export function Profile() {
  const { address } = useAccount();
  console.log("🚀 ~ Profile ~ address:", address);
  const { data, error, isError } = useReadContract({
    abi,
    address: "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
    functionName: "gameOwner",
    config,
  });
  console.log("🚀 ~ Profile ~ result:", data);
  console.log("🚀 ~ Profile ~ isError:", isError);
  console.log("🚀 ~ Profile ~ error:", error);
  return (
    <>
      <Connect />
      <div>data:{(data as string) && (data as string)}</div>
    </>
  );
}

/**
 * 
 * import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  })
}
 */
