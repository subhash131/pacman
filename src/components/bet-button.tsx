"use client";
import { config } from "@/providers/config";
import React from "react";
import { useAccount, useChainId, useWriteContract, Connector } from "wagmi";
import { parseAbi } from "viem";

import abi from "../abi/abi.json";
import { useMetamaskConnector } from "./useMetamaskConnector";
import { toast } from "sonner";

const BetButton = () => {
  const chainId = useChainId();
  const { address, isConnected: isWalletConnected, connector } = useAccount();
  const { connect, metaMaskConnector } = useMetamaskConnector();

  const { writeContract } = useWriteContract({ config });
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const handleBetNow = () => {
    console.log("🚀 ~ BetButton ~ metaMaskConnector:", metaMaskConnector);

    if (!metaMaskConnector) {
      toast.error("Metamask not found!");
      return;
    }

    if (!isWalletConnected) {
      connect({ connector: metaMaskConnector, chainId });
    }
    writeContract({
      abi: parseAbi(["function placeBet()"]),
      address: "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
      functionName: "placeBet",
      // @ts-ignore
      value: 1,
    });
  };
  return (
    <button
      className={`px-6 hover:scale-105 active:scale-95 transition-all py-2 bg-white rounded-xl text-black font-semibold mt-10 disabled:bg-neutral-500`}
      onClick={handleBetNow}
    >
      Bet now
    </button>
  );
};

export default BetButton;
