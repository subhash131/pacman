"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import abi from "../../abi/abi.json";

const Connect = dynamic(() => import("./connect").then((res) => res.Connect));

export function Profile() {
  const { address } = useAccount();

  console.log("🚀 ~ Profile ~ address:", address);
  const result = useReadContract({
    abi,
    address: "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
    functionName: "gameOwner",
  });
  console.log("🚀 ~ Profile ~ result:", result);
  return (
    <>
      <Connect />
      <div>Error fetching ENS name:</div>
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
